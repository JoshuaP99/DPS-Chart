var focusCard = {}
var roleTypes = {}
var employeeList = {}

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

/**
 * @param {string} pathName 
 * The path name refers to the id of the path to set 
 * the css property to 100% visibility
 * @param {string} title 
 * Title refers to a specific string in the id to
 * refer to all ids that contain a specific ending text
 */

function colorChanger(pathName, title){
    $("path").css("opacity", "20%")
    $("circle").css("opacity", "20%")
    $(pathName).css("opacity", "100%")
    $(`[id*='${title}'`).css("opacity", "100%")
}

/**
 * @param {string} pathName 
 * The path name refers to the id of the path to set 
 * the css property to 100% visibility
 */

function colorReset(pathName){
    $("path").css("opacity", "100%")
    $("circle").css("opacity", "100%")
    $('#menucontainer').css('opacity', '0%')
    $(pathName).css("opacity", "0%")
}

/**
 * @param {string} pathName 
 * The path name refers to the id of the path to set 
 * the css property to 100% visibility
 */

function pathToggle(pathName){
    $("[id$='Selected-Role-Type']").css("opacity", "0%")
    $('#menucontainer').css('opacity', '100%')
    $(pathName).css("opacity", "100%")
}

function pathReset(){
    $("[id$='Selected-Role-Type']").css("opacity", "0%")
    $('#menucontainer').css('opacity', '0%')
    $(pathName).css("opacity", "0%")
}

//The Jquery unction that will draw the div and update based
//on the info given to it

function areaOfFocusPage(){
    $('#menucontainer').empty()
    $('#menucontainer').css('opacity', '0%')
    $('#MainBody').empty()
    $("#MainBody").append(`
        <div>
            <h1>Areas of Focus</h1>
        </div>
        </br>
        <div class="d-flex justify-content-left" id="DOM">
            <div class="mySVG" id="SVGGraphic">
        </div>
    `)
    $("#SVGGraphic").load("/src/Areas-of-Focus.svg", function(){
        $("#SVGGraphic svg").css("height", "40vw");
        $("#Areas_of_Focus_Labels-Color path").on("click", function(evt) {
            var parsedStringArray = evt.target.id.split('_');
            var pathID = ("#" + (evt.target.id))
            if($('#menucontainer').length == 0){
                areaOfFocusBody(parsedStringArray[0])
                console.log("not long")
            } else {
                console.log("too long")
                $('#menucontainer').css('opacity', '100%')
                $('#menucontainer').html("")
                areaOfFocusBody(parsedStringArray[0])
            }
            colorChanger(pathID, parsedStringArray[0]); 
        });
    })
}

function areaOfFocusBody(areaOfFocus) {
    $("#menucontainer").append(`
    <span onclick="colorReset(); return false;" class="btn btn-default large">
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
    </div>`)
}

function roleTypesPage(){
    $('#menucontainer').empty()
    $('#menucontainer').css('opacity', '0%')
    $('#MainBody').empty();
    $("#MainBody").append(`
    <div>
        <h1>Role Types</h1>
    </div>
    </br>
    <div class="d-flex justify-content-left" id="DOM">
        <div class="mySVG" id="RoleTypesSVG">
    </div>`);

    $("#RoleTypesSVG").load("/src/Role-Type.svg", function(){
        $("#RoleTypesSVG svg").css("height", "40vw");
        $("[id$='Selected-Role-Type']").on("click", function(evt) {
            var parsedStringArray = evt.target.id.split('_')
            var pathID = ("#" + (evt.target.id))
            if($('#menucontainer').length == 0){
                roleTypesBody(parsedStringArray[0]);
            } else {
                $('#menucontainer').html("")
                roleTypesBody(parsedStringArray[0]);
            }
            pathToggle(pathID);
        });
    })
}

//The Jquery unction that will draw the div and update based
//on the info given to it. This is for the roletypes page when
//cicking one of the highlighted pieces 
function roleTypesBody(role) {
    $("#menucontainer").append(`
    <span onclick="pathReset(); return false;" class="btn btn-default large">
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
    </div>`)
} 

function individualizedPathwayPage(){
    $('#MainBody').empty();
    $("#MainBody").append(`
    <div>
        <h1>Individualized Pathway</h1>
    </div>
    </br>
    <div class="d-flex justify-content-left" id="DOM">
        <div class="mySVG" id="PathwaySVG"></div>
    </div>`);

    $("#PathwaySVG").load("/src/Areas-of-Focus.svg", function(){
        $("#PathwaySVG svg").css("height", "40vw");
        $("circle").on("click", function(evt) {
            var parsedStringArray = evt.target.id.split('_')
            employeeCard(parsedStringArray[0]);
            $("circle").css("fill", "#f1562c");
            $("path").css("filter", "opacity(25%)");
        });
    })
}


function employeeCard(employee){
    $('#DOM').append(`
    <div class="textbox">
        <span id="close" onclick="this.parentNode.remove();  location.reload(); return false;" class="btn btn-default large">
            <img src="/src/Esc X.svg" height="33" width="33"></img>
        </span>
        <div class="card-body" id="card-div">
            <img src="${employeeList[employee]?.image ?? 'https://images.saymedia-content.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTczOTM5NzMzODQyMzcxNjQ4/guts-a-berserk-character-analysis.jpg'}" class="card-profile-picture"></img>
            </br><h2>${employeeList[employee]?.name ?? 'none'}</h2>
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