const get_kpi_name = async (dt,field) => {
    let kpi = dt.form_dialog.get_value('kpi');
    if (kpi) {
        let kpi_name = await frappe.db.get_value('KPIs', kpi, 'kpi_name');
        if (kpi_name?.message?.kpi_name) {
            dt.form_dialog.set_value(field, kpi_name?.message?.kpi_name)
        }
    }
}

frappe.ui.form.on("Grant", {
    setup(frm) {
        frm['dt_events'] = {
            ...frm['dt_events'],
            "Output": {
                ...frm['dt_events']?.['Output'],
                after_render: function (dt, mode) {
                    lfas_after_form_render(frm, dt, "Output");
                    if (mode == 'create') {
                        handleFrequencyField(dt, dt.form_dialog);
                        dt.form_dialog.set_value('ngo', frm.doc.ngo)
                    }
                    dt.form_dialog.set_df_property('planning_table', 'cannot_add_rows', 1)
                    dt.form_dialog.set_df_property('planning_table', 'cannot_delete_rows', 1)
                },
                frequency: function (dt, mode) {
                    handleFrequencyField(dt, dt.form_dialog);
                },
                state: (dt, mode) => {
                    dt.form_dialog.set_value("district", '')
                },
                kpi: function (dt, mode) {
                    if (mode == 'create') {
                        get_kpi_name(dt, 'output_name');
                    }
                }
            },
            "Outcome": {
                ...frm['dt_events']?.['Outcome'],
                after_render: function (dt, mode) {
                    lfas_after_form_render(frm, dt, "Outcome");
                    if (mode == 'create') {
                        handleFrequencyField(dt, dt.form_dialog);
                        dt.form_dialog.set_value('ngo', frm.doc.ngo)
                    }
                    dt.form_dialog.set_df_property('planning_table', 'cannot_add_rows', 1)
                    dt.form_dialog.set_df_property('planning_table', 'cannot_delete_rows', 1)
                },
                frequency: function (dt, mode) {
                    handleFrequencyField(dt, dt.form_dialog);
                },
                state: (dt, mode) => {
                    dt.form_dialog.set_value("district", '')
                },
                kpi: function (dt, mode) {
                    if (mode == 'create') {
                        get_kpi_name(dt, 'outcome_name');
                    }
                }
            },
            "Impact": {
                ...frm['dt_events']?.['Impact'],
                after_render: function (dt, mode) {
                    lfas_after_form_render(frm, dt, "Impact");
                    if (mode == 'create') {
                        handleFrequencyField(dt, dt.form_dialog);
                        dt.form_dialog.set_value('ngo', frm.doc.ngo)
                    }
                    dt.form_dialog.set_df_property('planning_table', 'cannot_add_rows', 1)
                    dt.form_dialog.set_df_property('planning_table', 'cannot_delete_rows', 1)
                },
                frequency: function (dt, mode) {
                    handleFrequencyField(dt, dt.form_dialog);
                },
                state: (dt, mode) => {
                    dt.form_dialog.set_value("district", '')
                },
                kpi: function (dt, mode) {
                    if (mode == 'create') {
                        get_kpi_name(dt, 'impact_name');
                    }
                }
            },
            "Budget Transaction": {
                ...frm['dt_events']?.['Budget Transaction'],
                after_render: function (dt, mode) {
                    let grant = dt.form_dialog.get_value('grant');
                    if (grant) {
                        dt.form_dialog.set_query('budget_plan', () => {
                            return {
                                filters: {
                                    'grant': ['=', grant]
                                }
                            }
                        })
                    }
                },
                custom_budget_head: function (dt, mode) {
                    let budget_head = dt.form_dialog.get_value('custom_budget_head');
                    let grant = dt.form_dialog.get_value('grant');
                    if (budget_head) {
                        dt.form_dialog.set_query('budget_plan', () => {
                            return {
                                filters: {
                                    'budget_head': ['=', budget_head],
                                    'grant': ['=', grant]
                                }
                            }
                        })
                    } else {
                        dt.form_dialog.set_query('budget_plan', () => {
                            return {
                                filters: { 'grant': ['=', grant] }
                            }
                        })
                    }
                }
            },
            "Budget Plan and Utilisation": {
                ...frm['dt_events']?.['Budget Plan and Utilisation'],
                after_render: function (dt, mode) {
                    if (mode == 'create') {
                        handleFrequencyField(dt, dt.form_dialog);
                        dt.form_dialog.set_value('ngo', frm.doc.ngo)
                        if (frm.doc?.other_fund_sources?.length) {
                            dt.form_dialog.set_query('other_fund_source', () => {
                                return {
                                    filters: {
                                        name: ['in', frm.doc.other_fund_sources.map(item => item.fund_source)]
                                    }
                                }
                            })
                        } else {
                            dt.form_dialog.set_query('other_fund_source', () => {
                                return {
                                    filters: {
                                        name: ['=', 'No Other Fund Sources selected for this grant.']
                                    }
                                }
                            })
                        }
                        if (dt.form_dialog.get_value('budget_head')) {
                            dt.form_dialog.set_query('sub_budget_head', () => {
                                return {
                                    filters: {
                                        name: ['=', dt.form_dialog.get_value('budget_head')]
                                    }
                                }
                            })
                        } else {
                            dt.form_dialog.set_query('sub_budget_head', () => {
                                return {
                                    filters: {
                                        name: ['=', 'Please select a budget head first.']
                                    }
                                }
                            })
                        }
                    }
                    dt.form_dialog.set_df_property('planning_table', 'cannot_add_rows', 1)
                    dt.form_dialog.set_df_property('planning_table', 'cannot_delete_rows', 1)
                }
            },
            "Quarterly Utilisation Report": {
                ...frm['dt_events']?.['Quarterly Utilisation Report'],
                after_render: async function (dt, mode) {
                    // let {message: {frequency}} = await frappe.db.get_value('Budget Plan and Utilisation', {grant: frm.doc.name}, 'frequency');
                    dt.form_dialog.set_df_property('quarterly_utilisation', 'cannot_add_rows', 1)
                    dt.form_dialog.set_df_property('quarterly_utilisation', 'cannot_delete_rows', 1)
                    frappe.call({
                        method: 'mgrant.apis.quarterly_utilisation_report.quarterly_utilisation_report.get_options',
                        args: {
                            project: frm.doc.project,
                            year: frm.doc.year,
                            grant: frm.docname,
                            frequency: 'Monthly',
                        },
                        callback: function (r) {
                            dt.form_dialog.set_df_property('quarter', 'options', r.message.period_options)
                        }
                    })
                    frappe.call({
                        method: 'mgrant.apis.quarterly_utilisation_report.quarterly_utilisation_report.use_option',
                        args: {
                            grant: frm.doc.name,
                        },
                        callback: function (r) {
                            setTimeout(function () {
                                let $select = $(dt.form_dialog.fields_dict.quarter.$input);
                                // First, enable all options
                                $select.find('option').prop('disabled', false);
                                // Then disable only the used quarters if data is available
                                if (r.message && r.message.length > 0) {
                                    (r.message || []).forEach(function (disabledValue) {
                                        $select.find('option[value="' + disabledValue + '"]').prop('disabled', true);
                                    });
                                }
                            }, 100);
                        }
                    })
                    if (mode != 'create') {
                        dt.form_dialog.set_df_property('quarter', 'hidden', 1)
                    }
                },
                quarter: async function (dt, mode) {
                    if (mode == 'create') {
                        toggleFieldError(dt.form_dialog, 'quarterly_utilisation', '', false, true)
                        let period = dt.form_dialog.get_value('quarter');
                        let period_object = dt.form_dialog?.fields_dict?.quarter?.df?.options?.find(item => item.value == period);
                        if (period_object) {
                            await dt.form_dialog.set_value('timespan', period_object.label)
                            await dt.form_dialog.set_value('start_date', period_object.start_date)
                            await dt.form_dialog.set_value('end_date', period_object.end_date)
                        }
                        await get_quarterly_utilisation_report(frm, dt, 'Monthly', 0)
                        budget_reporting_variance_validation(dt)
                    }
                },
            },
            "Periodic Output Achievement": {
                ...frm['dt_events']?.['Periodic Output Achievement'],
                after_render: function (dt, mode) {
                    dt.form_dialog.set_df_property('periodic_achievement', 'cannot_add_rows', 1)
                    dt.form_dialog.set_df_property('periodic_achievement', 'cannot_delete_rows', 1)
                    setup_period_options_for_lfa_reportings(dt, 'mgrant.apis.periodic_output_achievement.get_options',"Quarterly")
                    disable_lfas_used_period_options(dt, 'mgrant.apis.periodic_output_achievement.use_option')
                    if (mode != 'create') {
                        dt.form_dialog.set_df_property('period', 'hidden', 1)
                    }
                },
                period: async function (dt, mode) {
                    if (mode == 'create') {
                        handle_period_change_for_lfa_reportings(dt, 'mgrant.apis.periodic_output_achievement.get_periodic_achievement_report',"Quarterly")
                    }
                },
            },
            "Periodic Outcome Achievement": {
                ...frm['dt_events']?.['Periodic Outcome Achievement'],
                after_render: function (dt, mode) {
                    dt.form_dialog.set_df_property('periodic_achievement', 'cannot_add_rows', 1)
                    dt.form_dialog.set_df_property('periodic_achievement', 'cannot_delete_rows', 1)
                    setup_period_options_for_lfa_reportings(dt, 'mgrant.apis.periodic_outcome_achievement.get_options',"Quarterly")
                    disable_lfas_used_period_options(dt, 'mgrant.apis.periodic_outcome_achievement.use_option')
                    if (mode != 'create') {
                        dt.form_dialog.set_df_property('period', 'hidden', 1)
                    }
                },
                period: async function (dt, mode) {
                    if (mode == 'create') {
                        handle_period_change_for_lfa_reportings(dt, 'mgrant.apis.periodic_outcome_achievement.get_periodic_achievement_report',"Quarterly")
                    }
                },
            },
            "Periodic Impact Achievement": {
                ...frm['dt_events']?.['Periodic Impact Achievement'],
                after_render: function (dt, mode) {
                    dt.form_dialog.set_df_property('periodic_achievement', 'cannot_add_rows', 1)
                    dt.form_dialog.set_df_property('periodic_achievement', 'cannot_delete_rows', 1)
                    setup_period_options_for_lfa_reportings(dt, 'mgrant.apis.periodic_impact_achievement.get_options',"Quarterly")
                    disable_lfas_used_period_options(dt, 'mgrant.apis.periodic_impact_achievement.use_option')
                    if (mode != 'create') {
                        dt.form_dialog.set_df_property('period', 'hidden', 1)
                    }
                },
                period: async function (dt, mode) {
                    if (mode == 'create') {
                        handle_period_change_for_lfa_reportings(dt, 'mgrant.apis.periodic_impact_achievement.get_periodic_achievement_report',"Quarterly")
                    }
                },
            }
        }
    }
})