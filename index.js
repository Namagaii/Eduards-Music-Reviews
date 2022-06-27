const displayArea = $("#review-display-area");
const reviewForm = $("#review-form-area");
const reviewContentFormArea = $("#review-content-form-area");
let contentForms = [];
let currentContentType = [];
$("#add-review-button").on("click", () => {
    
});
$("#review-content-minus-button").click((event) => {
    console.log("click minus");
    if (event.target.tagName !== "INPUT"){return;}
    removeContentForm();
});
$("#review-content-plus-button").click((event) => {
    console.log("click plus");
    if (event.target.tagName !== "INPUT"){return;}
    generateContentForm();
});

const getCurrentIndex = (id) => {
    let chars = id.split("");
    return parseInt(chars[chars.length-1]);
};

const onTypeChange = (event) => {
    if (event.target.tagName !== "SELECT") {return;}
    let index = getCurrentIndex(event.target.id);
    if (event.target.selectedIndex === currentContentType[index]){return;}
    // Generate new form content and replace previous content. Then update currentContentType
    const content = generateFormContent(index, event.target.selectedIndex);
    const contentArea = $("#review-content-area"+index);
    contentArea.empty();
    contentArea.append(content);
    currentContentType[index] = event.target.selectedIndex;
}

const onAddListItem = (event) => {
    if (event.target.tagName !== "INPUT") {return;}
    const contentArea = $("#review-content-area" + getCurrentIndex(event.target.id));
    const label = $("<label>");
    const textField = $("<input>");
    console.log(contentArea.children());
    const index = getCurrentIndex(contentArea.children().last().prop("id")) + 1;
    label.prop("for", `list-item${index}`);
    label.text("Enter List Item Text: ")
    textField.prop("type", "text");
    textField.prop("id", `list-item${index}`);
    textField.prop("name", `list-item${index}`);
    contentArea.append([label, textField]);
}

const onSubtractListItem = (event) => {
    if (event.target.tagName !== "INPUT") {return;}
}
/*
    review format:
    <div class="review">
        <h3>{title}</h3>
        conditional elements:
        if paragraph:
        <p>{content.text}</p>
        if unordered list:
        <ul>
            <li>{content.text{i}[0]}</li>
            <li>{content.text{i}[1]}</li>
            etc...
        </ul>
        if ordered list:
        <ol type={olType}>
            <li>{content.text{i}[0]}</li>
            <li>content.text{i}[1]</li>
            etc...
        </ol>
    </div>
    review data object:
    title,
    content {
        text0: "" or []: "", "", etc...,
        if text == []: type0: "unordered" or "ordered"
        text1: "" or []: "", "", etc...,

    }
*/
function generateReview () {
    
}

function removeContentForm () {
    if (contentForms.length === 1){
        return;
    }
    console.log("removed index "+(contentForms.length-1))
    $(`#${contentForms[contentForms.length-1].prop("id")}`).remove();
    contentForms.pop();
    currentContentType.pop();
}

function generateFormContent (index, contentType) {
    let output = [];
    const p = () => {
        const contentFieldLabel = $("<label>");
        const textArea = $("<textarea>");
        contentFieldLabel.prop("for", `review-content-field${index}`);
        contentFieldLabel.text("Enter Paragraph Here: ");
        textArea.prop("id", `review-content-field${index}`);
        textArea.prop("name", `review-content-field${index}`);
        textArea.prop("row", "5");
        textArea.prop("cols", "40");
        output.push(contentFieldLabel, textArea);
    }

    const list = () => {
        // Create elements
        const buttonContainer = $("<div>");
        const addButton = $("<input>");
        const minusButton = $("<input>");
        const listItemLabel = $("<label>");
        const listItemTextField = $("<input>");
        // Add properties
        buttonContainer.prop("id", "list-buttons");
        addButton.prop("type", "button");
        addButton.prop("class", "list-button");
        addButton.prop("id", "list-add-button"+index);
        addButton.prop("name", "list-add-button"+index);
        addButton.prop("value", "+");
        minusButton.prop("type", "button");
        minusButton.prop("class", "list-button");
        minusButton.prop("id", "list-minus-button"+index);
        minusButton.prop("name", "list-minus-button"+index);
        minusButton.prop("value", "-");
        listItemLabel.prop("for", `list-item0`);
        listItemLabel.text("Enter List Item Text: ")
        listItemTextField.prop("type", "text");
        listItemTextField.prop("id", `list-item0`);
        listItemTextField.prop("name", `list-item0`);
        // Add event listener
        addButton.on("click", onAddListItem);
        minusButton.on("click", onSubtractListItem);
        // Append Elements
        buttonContainer.append([addButton, minusButton]);
        output.push(buttonContainer, listItemLabel, listItemTextField);
    }

    switch(contentType){
        case 0:
            p();
            break;
        case 1:
            list();
            break;
        case 2:
            list();
            break;
        default:
            p();
            break;
    }
    return output;
}

function generateContentForm () {
    function generateOptions () {
        const options = [];
        options.push($("<option>"));
        options.push($("<option>"));
        options.push($("<option>"));
        return options;
    }
    const labelText = [
        "Select Content Type: ",
        "Paragraph",
        "Udordered List",
        "Ordered List",
    ]
    // create elements
    const container = $("<div>");
    const typeLabel = $("<label>");
    const typeSelect = $("<select>");
    const typeOptions = generateOptions();
    const contentArea = $("<div>");
    const formContent = generateFormContent(0);
    // add properties
    const index = contentForms.length;
    container.prop("id", `review-content${index}`);
    typeLabel.prop("for", `review-content-type${index}`);
    typeLabel.text(labelText[0]);
    typeSelect.prop("name", `review-content-type${index}`);   
    typeSelect.prop("id", `review-content-type${index}`);
    contentArea.prop("id", `review-content-area${index}`);
    typeOptions[0].prop("value", "p");
    typeOptions[0].prop("selected", true);
    currentContentType.push(0); // initializing array current content type
    typeOptions[0].text(labelText[1]);
    typeOptions[1].prop("value", "ul");
    typeOptions[1].text(labelText[2]);
    typeOptions[2].prop("value", "ol");
    typeOptions[2].text(labelText[3]);
    // add events
    typeSelect.on("change", onTypeChange);
    // append elements to create element tree
    typeSelect.append(typeOptions);
    contentArea.append(formContent);
    container.append([typeLabel, typeSelect, contentArea]);
    reviewContentFormArea.append(container);
    contentForms.push(container);
}

generateContentForm();