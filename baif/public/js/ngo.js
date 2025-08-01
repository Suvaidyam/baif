async function mkh_make_bank_details_readonly(frm) {
    let fields = ["ifsc_code", "bank_name", "branch_name", "bank_address", "account_holder_name", "account_number", "bank_account_number", "fcranon_fcra", "correspondent_bank", "routing_numbers", "custom_savings_current_account_number"];
    const grant = await frappe.call({
        method: 'frappe.client.get_list',
        args: {
            doctype: 'Grant',
            filters: { ngo: frm.doc.name },
            fields: ['name'],
            limit: 1
        }
    });
    if (grant.message[0]?.name) {
        if (frappe.boot.user_team == "NGO") {
            frm.set_df_property("bank_details_update_request", "hidden", 0);
            for (let field of fields) {
                // if (frm.doc[field]) {
                frm.set_df_property(field, "read_only", 1);
                // }
            }
            if (frm.doc.ifsc_code) {
                frm.set_df_property("fetch_bank_details", "hidden", 1);
            }
        }
    } else {
        frm.set_df_property("bank_details_update_request", "hidden", 1);
    }
    ["bank_name", "branch_name", "bank_address"].forEach(field => {
        if (frm.doc[field]) frm.set_df_property(field, "read_only", 1);
    });
}

function validate_pincode(pincode) {
    const pinStr = String(pincode);
    if (pinStr?.length != 6) {
        return false
    }
    return true
}

frappe.ui.form.on("NGO", {
    setup(frm) {
        frm['dt_events'] = {
            ...frm['dt_events'],
            "Bank Details Update Request": {
                ...frm['dt_events']['Bank Details Update Request'],
                after_render: async (dt, mode) => {
                    if (mode == 'create') {
                        frappe.db.get_value('Bank Details Update Request', {
                            ngo: frm.doc.name,
                            workflow_state: ['in', ['Pending', 'Submitted']]
                        }, 'workflow_state').then(r => {
                            if (r && r.message && r.message.workflow_state) {
                                setTimeout(() => {
                                    dt.form_dialog.hide()
                                }, 1000);
                                frappe.throw('Bank details update request already exists.');
                            }
                        });
                        const fields = [
                            "ifsc_code", "bank_name", "branch_name", "bank_address", "swift_code",
                            "fcranon_fcra", "correspondent_bank", "routing_numbers",
                            "account_holder_name", "account_number", "bank_details_update_request", "custom_savings_current_account_number"
                        ];
                        fields.forEach(f => dt.form_dialog.set_value(f, frm.doc?.[f]));

                    }
                    ["bank_name", "branch_name", "bank_address"].forEach(f =>
                        dt.form_dialog.set_df_property(f, "read_only", 1)
                    );
                },
                async validate(dt, mode) {
                    if (dt.form_dialog.get_value("account_number") && (!dt.form_dialog.get_value("account_number") || isNaN(dt.form_dialog.get_value("account_number")))) {
                        (frappe.utils.toggleFieldError(dt.form_dialog, 'account_number', frappe.utils.messages.get('account_number')));
                    } else {
                        (frappe.utils.toggleFieldError(dt.form_dialog, 'account_number', '', false));
                    }
                    if (mode == 'create') {
                        const fields = [
                            "ifsc_code", "bank_name", "branch_name", "bank_address", "swift_code",
                            "fcranon_fcra", "correspondent_bank", "routing_numbers",
                            "account_holder_name", "account_number", "custom_savings_current_account_number"
                        ];
                        const allSame = fields.every(f => {
                            const frmVal = frm.doc?.[f]?.trim?.() || '';
                            const dialogVal = dt.form_dialog.get_value(f)?.trim?.() || '';
                            return frmVal === dialogVal;
                        });

                        if (allSame) {
                            frappe.utils.toggleFieldError(
                                dt.form_dialog,
                                'account_number',
                                `It looks like you haven't made any changes to your bank details. Please modify the information you'd like to update and try again`,
                                true,
                                true
                            );
                        } else {
                            frappe.utils.toggleFieldError(dt.form_dialog, 'account_number', '', false, false);
                        }
                    }
                    let ifsc_code = dt.form_dialog.get_value("ifsc_code");
                    if (ifsc_code) {
                        let ifsc_code_valid = validate_ifsc(dt.form_dialog, "ifsc_code", 'dialog');
                        if (!ifsc_code_valid) {
                            truncate_bank_details(dt.form_dialog);
                            frappe.validated = false;
                            throw new Error(frappe.utils.messages.get('ifsc_code_invalid'));
                        } else {
                            await fetch_and_setup_ngo_bank_details(dt.form_dialog, ifsc_code);
                        }
                    } else {
                        truncate_bank_details(dt.form_dialog);
                        frappe.validated = true;
                    }
                    let account_number = dt.form_dialog.get_value("account_number");
                    if (account_number) {
                        let res = await frappe.db.exists('NGO', { 'name': ['!=', frm.doc.name], 'account_number': account_number })
                        if (res) {
                            frappe.throw('Account number already exists');
                        }

                    }
                },
            }
        };
    },
    refresh(frm) {
        if (!frm.is_new()) {
            mkh_make_bank_details_readonly(frm);
        }
    },
    custom_same_as_registered_address(frm) {
        if (frm.doc.custom_same_as_registered_address) {
            frm.set_value('custom_country_comm', frm.doc.country)
            frm.set_value('custom_stateprovinceregion_comm', frm.doc.state)
            frm.set_value('custom_citytown_comm', frm.doc.citytown)
            frm.set_value('custom_pincode_comm', frm.doc.pincode)
            frm.set_value('custom_address_line_1_comm', frm.doc.address_1)
            frm.set_value('custom_address_line_2_comm', frm.doc.address_2)
        }else{
            frm.set_value('custom_country_comm', '')
            frm.set_value('custom_stateprovinceregion_comm', '')
            frm.set_value('custom_citytown_comm', '')
            frm.set_value('custom_pincode_comm', '')
            frm.set_value('custom_address_line_1_comm', '')
            frm.set_value('custom_address_line_2_comm', '')
        }
    },
    validate(frm) {
        // Validate pincode length
        if (frm.doc.pincode && !validate_pincode(frm.doc.pincode)) {
            frappe.validated = false;
            frappe.throw(__('Pincode must be exactly 6 digits'));
        }

        // Validate custom pincode comm length
        if (frm.doc.custom_pincode_comm && !validate_pincode(frm.doc.custom_pincode_comm)) {
            frappe.validated = false;
            frappe.throw(__('Pincode must be exactly 6 digits'));
        }
    }
})