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
const onTypeChange = (event) => {
    function getCurrentIndex() {
        let id = event.target.id;
        let chars = id.split("");
        return parseInt(chars[chars.length-1]);
    }
    if (event.target.tagName !== "SELECT") {return;}
    if (event.target.selectedIndex === currentContentType[getCurrentIndex()]){return;}
    //Change appropriate form fields TODO
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
        "Enter Paragraph Here: "
    ]
    // create elements
    const container = $("<div>");
    const typeLabel = $("<label>");
    const typeSelect = $("<select>");
    const typeOptions = generateOptions();
    const contentFieldLabel = $("<label>");
    const textArea = $("<textarea>");
    // add properties
    const index = contentForms.length;
    container.prop("id", `review-content${index}`);
    typeLabel.prop("for", `review-content-type${index}`);
    typeLabel.text(labelText[0]);
    typeSelect.prop("name", `review-content-type${index}`);   
    typeSelect.prop("id", `review-content-type${index}`);
    typeOptions[0].prop("value", "p");
    typeOptions[0].prop("selected", true);
    currentContentType.push(0); // initializing array current content type
    typeOptions[0].text(labelText[1]);
    typeOptions[1].prop("value", "ul");
    typeOptions[1].text(labelText[2]);
    typeOptions[2].prop("value", "ol");
    typeOptions[2].text(labelText[3]);
    contentFieldLabel.prop("for", `review-content-field${index}`);
    contentFieldLabel.text(labelText[4]);
    textArea.prop("id", `review-content-field${index}`);
    textArea.prop("name", `review-content-field${index}`);
    textArea.prop("row", "5");
    textArea.prop("cols", "40");
    // add events
    typeSelect.on("change", );
    // append elements to create element tree
    typeSelect.append(typeOptions);
    container.append([typeLabel, typeSelect, contentFieldLabel, textArea]);
    console.log(container)
    reviewContentFormArea.append(container);
    contentForms.push(container);
}

generateContentForm();