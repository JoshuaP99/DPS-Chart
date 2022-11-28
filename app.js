$.getJSON("/src/Areas-of-focus.json", function(json){
    console.log(json);
});

class focusCard {
    constructor(title, body){
        this.title = title
        this.body = body
    }
}

$(document).ready(function(){
    $("#SVGGraphic").load("/src/Wheel-Graphic.svg", function(){
        $("#SVGGraphic svg").css("height", "1000", "width", "1000px");

        console.log("loaded successfully")
        
        $("#growth-path").click(function(evt) {
            switch(evt.target.id){
                case "Finance_Vision":
                    console.log("object clicked");
                    areaOfFocusBody();
                    break;
                case "Innovation_Vision":
                    console.log("object clicked");
                    areaOfFocusBody();
                    break;
                case "Tech_Vision":
                    console.log("clicked")
                    areaOfFocusBody();
                    break;
                default:
                    break;
            }
        });
    });
});

function areaOfFocusBody() {
    $("#DOM").append(`
    <div class="textbox">
        <span id="close" onclick="this.parentNode.remove(); return false;" class="btn btn-default large">
            <img src="/src/Esc X.svg" height="33" width="33"></img>
        </span>
        <h2>${focusCard.title}</h2>
        <div class="card-body" id="card-div">
            <p class="card-body" style="padding: 1rem">${focusCard.body}</p>
            <div class="container">
                <div class="row">
                    <div class="col text-center" style="padding-bottom: 1rem;">
                        <button class="btn btn-primary" role="button">Show Employees in this Section</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`)
}