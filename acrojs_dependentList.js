/*
LICENSE:
acrojs_dependentList.js by Joel Geraci is licensed under a Creative Commons Attribution 4.0 International License.
https://creativecommons.org/licenses/by/4.0/

You are free to:
Share — copy and redistribute the material in any medium or format
Adapt — remix, transform, and build upon the material for any purpose, even commercially.

Setup:
For list boxes:  Add this script to the "selection change" script of the master list box.
For combo boxes: Add this script to the "custom format" script of the dropdown box. 

IMPORTANT!
Edit the following line to identify the field name of the dependent list box then edit the properties of the dependentListValues JSON object. Property names should correspond to the export values of the list items.
*/
var dependentListBoxFieldName = "dependentListBox";
var dependentListValues = 
{
	"animal": [
		["Dogs", "dogs"],
		["Cats", "cats"],
		["Pandas", "pandas"]
	],
	"mineral": [
		["Gold", "Au"],
		["Silver", "Ag"],
		["Lead", "Pb"]
	],
	"veggie": [
		["Carrots", "carrots"],
		["Broccoli", "broccoli"],
		["Spinach", "spinach"]
	]
};
/*
You probably don't need to change anything from here down
*/
if ((event.target.type == "combobox" && event.name == "Format") || (event.target.type == "listbox" && event.name == "Keystroke")) {
	if (event.target.type == "combobox") {
		if (dependentListValues.hasOwnProperty(event.target.value)) {
			this.getField(dependentListBoxFieldName).setItems(dependentListValues[event.target.value]);
		}
		else {
			this.getField(dependentListBoxFieldName).clearItems();
		}
	}
	if (event.target.type == "listbox" && dependentListValues.hasOwnProperty(event.changeEx)) {
		this.getField(dependentListBoxFieldName).setItems(dependentListValues[event.changeEx]);	
	}
}
else {
	app.alert("This script was not intended for this field type or event.");	
}