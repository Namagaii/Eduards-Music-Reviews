const displayArea = $("#review-display-area");
const reviewForm = $("#review-form-area");
$("#add-review-button").on("click", () => {
    
});
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