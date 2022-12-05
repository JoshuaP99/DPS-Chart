//Area of Focus object to hold data as an object
//Role Types object as well
var focusCard = {}
var roleTypes = {}
var employeeList = {}

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

$.getJSON("", function(json){
    console.log(json)
    employeeList = JSON.parse(JSON.stringify(json));
}).then(function(){
    console.log("Done")
})


//JQuery load function to bring in the local SVG into the 
//HTML div with the ID SVGGraphic. The function returns
//a console log that alerts when loaded in and styles the
//graphic
$(document).ready(function(){
    $("#SVGGraphic").load("/src/Areas-of-Focus.svg", function(event){
        $("#SVGGraphic svg").css("height", "1000", "width", "1000px");

        console.log("loaded successfully")
        
        $("path").on("click", function(evt) {
            var parsedStringArray = evt.target.id.split('_');
            var pathID = ("#" + (evt.target.id))
            $(pathID).toggleClass("blackBack")
            console.log(parsedStringArray);
            console.log(pathID);
            areaOfFocusBody(parsedStringArray[0]);
            colorChanger(pathID); 
        });
    })
    $("#RoleTypesSVG").load("/src/Role-Types-Graphic.svg", function(){
        $("#RoleTypesSVG svg").css("height", "1000", "width", "1000");

        console.log("loaded successfully")

        $("path").on("click", function(evt) {
            console.log(evt.target.id.split('_'))
            var parsedStringArray = evt.target.id.split('_')
            roleTypesBody(parsedStringArray[0]);
            var pathID = ("#" + (evt.target.id))
            colorChanger(pathID)
        });
        $("circle").on("click", function(evt) {
            console.log(evt.target.id.split('_'))
            var parsedStringArray = evt.target.id.split('_')
            roleTypesBody(parsedStringArray[0]);
            $("circle").css("fill", "#f1562c");
            $("path").css("filter", "opacity(25%)");
        });
    })
    $("#PathwaySVG").load("/src/Areas-of-Focus.svg", function(){
        $("#PathwaySVG svg").css("height", "1000", "width", "1000");

        console.log("loaded successfully")

        $("circle").on("click", function(evt) {
            console.log(evt.target.id.split('_'))
            var parsedStringArray = evt.target.id.split('_')
            employeeCard(parsedStringArray[0]);
            $("circle").css("fill", "#f1562c");
            $("path").css("filter", "opacity(25%)");
        });
    })
});


function colorChanger(pathName){
    $("path").css("filter", "opacity(25%)")
    $("circle").css("filter", "opacity(25%)")
    $(pathName).css("fill", "#f1562c")
    $(pathName).css("filter", "opacity(100%)")
}

function closeButton(){
    this.parentNode.remove(); 
    location.reload(); 
    return false;
}

//The Jquery unction that will draw the div and update based
//on the info given to it
function areaOfFocusBody(areaOfFocus) {
    $("#DOM").append(`
    <div class="textbox" id="menucontainer">
        <span id="closeButton" class="btn btn-default large">
            <img src="/src/Esc X.svg" height="33" width="33"></img>
        </span>
        <h2>${focusCard[areaOfFocus]?.title ?? 'none'}</h2>
        <div class="card-body" id="card-div">
            <p class="card-body" style="padding: 1rem">${focusCard[areaOfFocus]?.body ?? 'none'}</p>
            <div class="container">
                <div class="row">
                    <div class="col text-center" style="padding-bottom: 1rem;">
                        <a target="_blank" rel="noopener noreferrer" href="${focusCard[areaOfFocus]?.url ?? 'none'}">
                            <button class="btn btn-primary" role="button">
                                Show Employees in this Section <img src="/src/opens-new-tab-arrow.svg" height="20">
                            </button>
                        </a>
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
        <span id="close" onclick="this.parentNode.remove(); location.reload(); return false;" class="btn btn-default large">
            <img src="/src/Esc X.svg" height="33" width="33"></img>
        </span>
        <h2>${roleTypes[role]?.title ?? 'none'}</h2>
        <div id="card-div">
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

function employeeCard(employee){
    $('#DOM').append(`
    <div class="textbox">
        <span id="close" onclick="this.parentNode.remove();  location.reload(); return false;" class="btn btn-default large">
            <img src="/src/Esc X.svg" height="33" width="33"></img>
        </span>
        <div class="card-body" id="card-div">
            <img src="">${employeeList[employee]?.image ?? 'none'}</img>
            <br><h2>${employeeList[employee]?.name ?? 'none'}</h2>
            <h3>${employeeList[employee]?.position ?? 'none'}</h3>
            <br><div class="container">
                <div class="row">
                    <div>
                        <a href="${employeeList[employee]?.profile ?? 'none'}" class="btn btn-primary">Profile <img src="/src/opens-new-tab-arrow.svg" height="20"></a>
                    </div>
                    <div>
                        <a href="" class="btn btn-primary">Pathway</a>
                    </div>
                    <img src="/src/Card Artwork.svg" class="card-artwork"></img>
                </div>
            </div>
        </div>
    </div>`)
}