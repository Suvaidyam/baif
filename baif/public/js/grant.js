lfas_after_form_render = (frm, dt, type) => {
    dt.form_dialog.set_query('state', () => {
        if (frm.doc.states.length) {
            return {
                filters: { name: ['in', frm.doc.states.map(item => item.state)] }
            }
        }
    });
    dt.form_dialog.set_query('district', () => {
        let state = dt.form_dialog.get_value('state');
        if (frm.doc.districts.length) {
            return {
                filters: { name: ['in', frm.doc.districts.map(item => item.district)], state: ['=', state ? state : 'Please select state'] }
            }
        } else {
            return {
                filters: { state: ['=', state ? state : 'Please select state'] }
            }
        }
    });
    dt.form_dialog.set_query('kpi', () => {
        if (frm.doc.theme) {
            return {
                filters: {
                    'theme': ['=', frm.doc.theme],
                    'kpi_type': ['=', type]
                }
            }
        } else if (frm.doc.custom_themes && frm.doc.custom_themes.length){
            return {
                filters: {
                    'theme': ['in', frm.doc.custom_themes.map(item => item.theme)],
                    'kpi_type': ['=', type]
                }
            }
        }
         else {
            return {
                filters: {
                    'kpi_type': ['=', type]
                }
            }
        }
    })
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
                        if (frm?.doc?.frequency) {
                            dt.form_dialog.set_value('frequency', frm.doc.frequency)
                            dt.form_dialog.set_df_property('frequency', 'read_only', 1)
                        }
                        handleFrequencyField(dt, dt.form_dialog);
                        dt.form_dialog.set_value('ngo', frm.doc.ngo)
                    }
                    dt.form_dialog.set_df_property('planning_table', 'cannot_add_rows', 1)
                    dt.form_dialog.set_df_property('planning_table', 'cannot_delete_rows', 1)
                },
            },
            "Outcome": {
                after_render: function (dt, mode) {
                    lfas_after_form_render(frm, dt, "Outcome");
                    if (mode == 'create') {
                        if (frm?.doc?.frequency) {
                            dt.form_dialog.set_value('frequency', frm.doc.frequency)
                            dt.form_dialog.set_df_property('frequency', 'read_only', 1)
                        }
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
                }
            },
            "Impact": {
                after_render: function (dt, mode) {
                    lfas_after_form_render(frm, dt, "Impact");
                    if (mode == 'create') {
                        if (frm?.doc?.frequency) {
                            dt.form_dialog.set_value('frequency', frm.doc.frequency)
                            dt.form_dialog.set_df_property('frequency', 'read_only', 1)
                        }
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
                }
            },
        }
    }
})