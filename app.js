//Area of Focus object to hold data as an object
//Role Types object as well
var focusCard = {}
var roleTypes = {}

//Asynchronous function to pull in local JSON file holding 
//the data for the information on the Area of Focus wheel 
$.getJSON("/src/Areas-of-focus.json", function(json){
    console.log(json)
    focusCard = JSON.parse(JSON.stringify(json));
}).then(function(){
    console.log("Done")
})

$.getJSON("/src/Role-types.json", function(json){
    console.log(json)
    roleTypes = JSON.parse(JSON.stringify(json));
}).then(function(){
    console.log("Done")
})

console.log("After get json")

//JQuery load function to bring in the local SVG into the 
//HTML div with the ID SVGGraphic. The function returns
//a console log that alerts when loaded in an styless the
//graphic
$(document).ready(function(){
    $("#SVGGraphic").load("/src/Wheel-Graphic.svg", function(){
        $("#SVGGraphic svg").css("height", "1000", "width", "1000px");

        console.log("loaded successfully")
        
        $("path").click(function(evt) {
            console.log(evt.target.id.split('_'))
            var parsedStringArray = evt.target.id.split('_')
            areaOfFocusBody(parsedStringArray[0]);
        });
    })
    $("#RoleTypesSVG").load("/src/Role-Types-Graphic.svg", function(){
        $("#RoleTypesSVG svg").css("height", "1000", "width", "1000");

        console.log("loaded successfully")

        $("path").click(function(evt) {
            console.log(evt.target.id.split('_'))
            var parsedStringArray = evt.target.id.split('_')
            roleTypesBody(parsedStringArray[0]);
        });

        $("circle").click(function(evt) {
            console.log(evt.target.id.split('_'))
            var parsedStringArray = evt.target.id.split('_')
            roleTypesBody(parsedStringArray[0]);
        });
    })
});

//The Jquery unction that will draw the div and update based
//on the info given to it
function areaOfFocusBody(areaOfFocus) {
    $("#DOM").append(`
    <div class="textbox">
        <span id="close" onclick="this.parentNode.remove(); return false;" class="btn btn-default large">
            <img src="/src/Esc X.svg" height="33" width="33"></img>
        </span>
        <h2>${focusCard[areaOfFocus]?.title ?? 'none'}</h2>
        <div class="card-body" id="card-div">
            <p class="card-body" style="padding: 1rem">${focusCard[areaOfFocus]?.body ?? 'none'}</p>
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

//The Jquery unction that will draw the div and update based
//on the info given to it. This is for the roletypes page when
//cicking one of the highlighted pieces 
function roleTypesBody(role) {
    $("#DOM").append(`
    <div class="textbox">
        <span id="close" onclick="this.parentNode.remove(); return false;" class="btn btn-default large">
            <img src="/src/Esc X.svg" height="33" width="33"></img>
        </span>
        <h2>${roleTypes[role]?.title ?? 'none'}</h2>
        <div class="card-body" id="card-div">
            <p class="role-subtitle">${roleTypes[role]?.subtitle ?? 'none'}</p>
            <h3>CHARGE</h3>
            <h4>${roleTypes[role]?.chargesubtitle ?? 'none'}</h4>
            <p class="role-text">${roleTypes[role]?.chargebody ?? 'none'}</p>
            <h3>SCOPE</h3>
            <h4>${roleTypes[role]?.scopesubtitle ?? 'none'}</h4>
            <p class="role-text">${roleTypes[role]?.scopebody ?? 'none'}</p>
            <h3>FORECASTING</h3>
            <h4>${roleTypes[role]?.forecastingsubtitle ?? 'none'}</h4>
            <p class="role-text">${roleTypes[role]?.forecastingbody ?? 'none'}</p>
            <h3>COMMUNICATION + RESPONSIBILITY</h3>
            <h4>${roleTypes[role]?.communicationsubtitle ?? 'none'}</h4>
            <p class="role-text">${roleTypes[role]?.communicationbody ?? 'none'}</p>
        </div>
    </div>`)
}