frappe.ui.form.on("NGO Due Diligence", {
    async setup(frm) {
        console.log("setup");
        if (frm.doc.ngo) {
            let fields = ["name", "custom_organisational_chart_","custom_vision_and_mission_of_organisation_attach","custom_list_of_trustees_board_of_directors_and_position_attach","custom_legal_affiliation_with_another_entity_or_attach"]
            let ngo_data = await frappe.db.get_value("NGO", frm.doc.ngo, fields);
            if (ngo_data?.message) {
                frm.set_value("custom_organisational_chart_", ngo_data?.message?.custom_organisational_chart_);
                frm.set_value("custom_vision_and_mission_of_organisation_attach", ngo_data?.message?.custom_vision_and_mission_of_organisation_attach);
                frm.set_value("custom_list_of_trustees_board_of_directors_and_position_attach", ngo_data?.message?.custom_list_of_trustees_board_of_directors_and_position_attach);
                frm.set_value("custom_legal_affiliation_with_another_entity_or_attach", ngo_data?.message?.custom_legal_affiliation_with_another_entity_or_attach);
            }
        }
    },
});
