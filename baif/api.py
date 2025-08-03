import frappe

@frappe.whitelist(allow_guest=True)
def create_baif_custom_fields(doctype_name="NGO Due Diligence"):
    # Define all custom fields with short and full labels
    custom_fields = [
        # Section: Programmatic Review
        {
            "dt": doctype_name,
            "short_label": "Programmatic Details",
            "full_label": "Programmatic Details",
            "fieldtype": "Tab Break",
            "collapsible": 1
        },
        {
            "dt": doctype_name,
            "short_label": "Programmatic Review",
            "full_label": "Programmatic Review",
            "fieldtype": "Section Break",
            "collapsible": 1
        },
        {
            "dt": doctype_name,
            "short_label": "Past Programme",
            "full_label": "Past Programme Experience",
            "fieldtype": "Column Break"
        },
        {
            "dt": doctype_name,
            "short_label": "Similar Programmes",
            "full_label": "Has the Organisation successfully implemented similar programmes before?",
            "fieldtype": "Select",
            "options": "Yes\nNo"
        },
        {
            "dt": doctype_name,
            "short_label": "Past Reports",
            "full_label": "Can the Organisation provide reports or documentation of past projects?",
            "fieldtype": "Select",
            "options": "Yes\nNo"
        },
        {
            "dt": doctype_name,
            "short_label": "Team Capacity",
            "full_label": "Team Capacity",
            "fieldtype": "Column Break"
        },
        {
            "dt": doctype_name,
            "short_label": "Qualified Staff",
            "full_label": "Does the Organisation have qualified staff to manage and implement the programme?",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Staff Attachment",
            "full_label": "Attachment - Qualified Staff",
            "fieldtype": "Attach"
        },
        {
            "dt": doctype_name,
            "short_label": "Training Measures",
            "full_label": "Are training and capacity-building measures in place for staff including trainings for underperforming staff?",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Training Attachment",
            "full_label": "Attachment - Training & Capacity Building",
            "fieldtype": "Attach"
        },
        {
            "dt": doctype_name,
            "short_label": "Monitoring MEL",
            "full_label": "Monitoring, Evaluation and Learning",
            "fieldtype": "Column Break"
        },
        {
            "dt": doctype_name,
            "short_label": "ME Processes",
            "full_label": "What processes does the Organisation have to monitor and evaluate the impact of its programmes",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Baseline Studies",
            "full_label": "Does the Organisation have the capacity to conduct baseline and endline studies?",
            "fieldtype": "Select",
            "options": "Yes\nNo"
        },
        {
            "dt": doctype_name,
            "short_label": "Data Collection",
            "full_label": "What are the Organisation's capabilities in data collection, analysis, and reporting?",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Sustainability",
            "full_label": "Sustainability",
            "fieldtype": "Column Break"
        },
        {
            "dt": doctype_name,
            "short_label": "Sustainability Plan",
            "full_label": "Does the Organisation have a long-term sustainability plan for the programme?",
            "fieldtype": "Select",
            "options": "Yes\nNo"
        },
        {
            "dt": doctype_name,
            "short_label": "Post Funding",
            "full_label": "How will the Organisation continue programme activities after the funding period ends?",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Additional Resources",
            "full_label": "What is the Organisation's plan to mobilise additional resources?",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Community Engagement",
            "full_label": "Community Engagement",
            "fieldtype": "Column Break"
        },
        {
            "dt": doctype_name,
            "short_label": "Local Communities",
            "full_label": "How does the Organisation engage with local communities in programme design and implementation?",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Feedback Mechanisms",
            "full_label": "What mechanisms does the Organisation have in place for community feedback and participation?",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Community Concerns",
            "full_label": "How does the Organisation address community concerns and ensure their voices are heard?",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Partnerships",
            "full_label": "Partnerships and Collaboration",
            "fieldtype": "Column Break"
        },
        {
            "dt": doctype_name,
            "short_label": "Local Partnerships",
            "full_label": "Does the Organisation have partnerships with local organisations, government agencies, or other stakeholders?",
            "fieldtype": "Select",
            "options": "Yes\nNo"
        },
        {
            "dt": doctype_name,
            "short_label": "Partnership Attach",
            "full_label": "Attachment - Partnerships with Local Organisations",
            "fieldtype": "Attach"
        },
        {
            "dt": doctype_name,
            "short_label": "Partnership Effect",
            "full_label": "How do these partnerships enhance the effectiveness of the Organisation's programmes?",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Coordination",
            "full_label": "What steps does the Organisation take to coordinate with other organisations and avoid duplication of efforts?",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Innovation",
            "full_label": "Innovation and Adaptation",
            "fieldtype": "Column Break"
        },
        {
            "dt": doctype_name,
            "short_label": "Innovative Approaches",
            "full_label": "Does the Organisation use innovative approaches or technologies in its programmes?",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Innovation Attach",
            "full_label": "Attachment - Innovative Approaches in Programmes",
            "fieldtype": "Attach"
        },
        {
            "dt": doctype_name,
            "short_label": "Programme Adaptation",
            "full_label": "How does the Organisation adapt its programmes to changing circumstances or emerging needs?",
            "fieldtype": "Small Text"
        },
        
        # Section: Safeguarding
        {
            "dt": doctype_name,
            "short_label": "Safeguarding",
            "full_label": "Safeguarding",
            "fieldtype": "Section Break",
            "collapsible": 1
        },
        {
            "dt": doctype_name,
            "short_label": "Safeguarding Officer",
            "full_label": "Does organisation have a dedicated role responsible for Safeguarding at the organisation? I.e Safeguarding Officer?",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Officer Attach",
            "full_label": "Attachment - Dedicated Safeguarding Officer",
            "fieldtype": "Attach"
        },
        {
            "dt": doctype_name,
            "short_label": "Safeguarding Policies",
            "full_label": "What are the Safeguarding policies that the Organisation has in place ? List Policies Organisation has to protect all vulnerable groups being engaged with including, but not limited to, women, children, and the elderly, from harm, exploitation, or neglect.",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Policies Attach",
            "full_label": "Attachment - Safeguarding Policies",
            "fieldtype": "Attach"
        },
        {
            "dt": doctype_name,
            "short_label": "Safeguarding Training",
            "full_label": "What trainings are provided to staff and key stakeholders, including participants on the orientation and awareness of the Safeguarding Policy?",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Training Attach SG",
            "full_label": "Attachment - Safeguarding Training",
            "fieldtype": "Attach"
        },
        {
            "dt": doctype_name,
            "short_label": "Reporting Mechanisms",
            "full_label": "What mechanisms does the Organisation have in place for reporting and addressing safeguarding concerns?",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Reporting Attach",
            "full_label": "Attachment - Safeguarding Reporting Mechanisms",
            "fieldtype": "Attach"
        },
        {
            "dt": doctype_name,
            "short_label": "Background Checks",
            "full_label": "Does the Organisation conduct background checks on staff and volunteers who work with vulnerable groups?",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Checks Attach",
            "full_label": "Attachment - Background Checks",
            "fieldtype": "Attach"
        },
        {
            "dt": doctype_name,
            "short_label": "Policy Review",
            "full_label": "How does the Organisation ensure regular review and updating of its safeguarding policies and procedures?",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Review Attach",
            "full_label": "Attachment - Regular Review of Safeguarding Policies",
            "fieldtype": "Attach"
        },
        {
            "dt": doctype_name,
            "short_label": "Whistleblowing Policy",
            "full_label": "Does the Organisation have a whistleblowing policy in place?",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Whistle Attach",
            "full_label": "Attachment - Whistleblowing Policy",
            "fieldtype": "Attach"
        },
        
        # Section: Notes on Recommendation by Programme Manager
        {
            "dt": doctype_name,
            "short_label": "PM Recommendation",
            "full_label": "Notes on Recommendation by Programme Manager",
            "fieldtype": "Section Break",
            "collapsible": 1
        },
        {
            "dt": doctype_name,
            "short_label": "Selection Reasons",
            "full_label": "Reasons for selection",
            "fieldtype": "Small Text",
            "reqd": 1
        },
        {
            "dt": doctype_name,
            "short_label": "Organisation Risks",
            "full_label": "Risk(s) attached with the Organisation",
            "fieldtype": "Small Text",
            "reqd": 1
        },
        {
            "dt": doctype_name,
            "short_label": "Recommendation",
            "full_label": "Recommendation",
            "fieldtype": "Small Text",
            "reqd": 1
        },
        {
            "dt": doctype_name,
            "short_label": "Comments",
            "full_label": "Comments",
            "fieldtype": "Small Text"
        },
        {
            "dt": doctype_name,
            "short_label": "Overall Score",
            "full_label": "Overall Recommendation Score (if applicable)",
            "fieldtype": "Data"
        },
        
        # Section: Final Recommendation
        {
            "dt": doctype_name,
            "short_label": "Final Recommendation",
            "full_label": "Final Recommendation",
            "fieldtype": "Section Break",
            "collapsible": 1
        }
    ]
    
    created_count = 0
    existing_count = 0
    error_count = 0
    updated_count = 0
    last_fieldname = "ngo_email"
    created_fields = []
    # PHASE 1: Create fields with short labels
    for i, field in enumerate(custom_fields):
        try:
            # Check if similar field already exists by short label
            existing_field = frappe.db.get_value("Custom Field", 
                {"dt": field["dt"], "label": field["short_label"]}, "name")
            
            if not existing_field:
                # Create the custom field with short label
                custom_field = frappe.get_doc({
                    "doctype": "Custom Field",
                    "dt": field["dt"],
                    "label": field["short_label"],  # Using short label initially
                    "fieldtype": field["fieldtype"],
                    "options": field.get("options", ""),
                    "insert_after": last_fieldname,
                    "reqd": field.get("reqd", 0),
                    "collapsible": field.get("collapsible", 0)
                })
                
                custom_field.insert()
                created_count += 1
                
                # Store for later label update
                created_fields.append({
                    "name": custom_field.name,
                    "fieldname": custom_field.fieldname,
                    "full_label": field["full_label"]
                })
                
                # Update last_fieldname for next iteration
                last_fieldname = custom_field.fieldname
                
                print("✓ Created: {} -> {}".format(field['short_label'], custom_field.fieldname))
            else:
                existing_count += 1
                print("⚠ Already exists: {}".format(field['short_label']))
                
                # Get the fieldname of existing field to maintain sequence
                existing_fieldname = frappe.db.get_value("Custom Field", existing_field, "fieldname")
                if existing_fieldname:
                    last_fieldname = existing_fieldname
                
        except Exception as e:
            error_count += 1
            print("✗ Error creating",i)
    
    # Commit after creating all fields
    frappe.db.commit()
    
    print("=" * 80)
    print("PHASE 1 COMPLETED - Starting PHASE 2: Updating labels to full text")
    print("=" * 80)
    
    # PHASE 2: Update labels to full text
    for field_info in created_fields:
        try:
            # Get the custom field document
            custom_field_doc = frappe.get_doc("Custom Field", field_info["name"])
            
            # Update the label to full text
            custom_field_doc.label = field_info["full_label"]
            custom_field_doc.save()
            
            updated_count += 1
            # print("✓ Updated label: {} -> {}".format(
            #     field_info["fieldname"], 
            #     field_info["full_label"][:50] + ("..." if len(field_info["full_label"]) > 50 else "")
            # ))
            
        except Exception as e:
            continue
            # print("✗ Error updating label for {}: {}".format(field_info["fieldname"], str(e)))
    
    # Final commit
    frappe.db.commit()
    
    if created_count > 0:
        print("🎉 Custom fields created successfully with proper labels!")
        print("💡 Don't forget to:")
        print("   1. Refresh your browser")
        print("   2. Check field permissions if needed")
        print("   3. Test the form functionality")
        print("   4. Fieldnames are short but labels are descriptive")
    
    return {
        "created": created_count,
        "updated": updated_count,
        "existing": existing_count,
        "errors": error_count,
        "total": len(custom_fields)
    }