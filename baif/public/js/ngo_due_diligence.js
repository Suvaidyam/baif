frappe.ui.form.on("NGO Due Diligence", {
    async setup(frm) {
        if (frm.doc.ngo) {
            // Use frappe.call to get the full NGO document
            let ngo_data = await frappe.call({
                method: "frappe.client.get",
                args: {
                    doctype: "NGO",
                    name: frm.doc.ngo,
                    fields: ["custom_organisational_chart_", "custom_vision_and_mission_of_organisation_attach", "custom_list_of_trustees_board_of_directors_and_position_attach", "custom_legal_affiliation_with_another_entity_or_attach"]
                }
            });
            if (ngo_data?.message) {
                let doc = ngo_data.message;
                frm.set_value("custom_organisational_chart_", doc.custom_organisational_chart_);
                frm.set_value("custom_vision_and_mission_of_organisation_attach", doc.custom_vision_and_mission_of_organisation_attach);
                frm.set_value("custom_list_of_trustees_board_of_directors_and_position_attach", doc.custom_list_of_trustees_board_of_directors_and_position_attach);
                frm.set_value("custom_legal_affiliation_with_another_entity_or_attach", doc.custom_legal_affiliation_with_another_entity_or_attach);
            }
        }
    },
});
