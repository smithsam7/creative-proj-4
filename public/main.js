var app = angular.module("myApp", [])
app.controller("mainCtrl", mainCtrl)

function mainCtrl($scope, $http){
    
    $scope.Update = function(form){
        $scope.resultList = [];
        var lat = form.lat;
        var lng = form.long;
        var alt = form.ele;

        $.ajax({
        type: 'GET',
        dataType: 'json',
        beforeSend: function(request) {
            request.setRequestHeader('x-access-token', 'e5ccbce54b12fb250b608eeb2109c65d');
        },
        url: 'https://api.openuv.io/api/v1/uv?lat=' + lat + '&lng=' + lng + '&alt=' + alt ,
        success: function(response) {
            //handle successful response
            console.log(response);
            var currentUV = response.result.uv;
            var curCategory = "";
            
            if (currentUV < 11) {
                if (currentUV < 8) {
                    if (currentUV < 6) {
                        if (currentUV < 3) {
                            curCategory = "Low";
                        }
                        else {
                            curCategory = "Moderate";
                        }
                    }
                    else {
                        curCategory = "High";
                    }
                }
                else {
                    curCategory = "Very High";
                }
            }
            else {
                curCategory = "Extreme";
            }
            $scope.resultList.push({
                level: currentUV,
                category: curCategory
            });

            var maxUV = response.result.uv_max;
            var maxCategory = "";
            if (maxUV < 11) {
                if (maxUV < 8) {
                    if (maxUV < 6) {
                        if (maxUV < 3) {
                            maxCategory = "Low";
                        }
                        else {
                            maxCategory = "Moderate";
                        }
                    }
                    else {
                        maxCategory = "High";
                    }
                }
                else {
                    maxCategory = "Very High";
                }
            }
            else {
                maxCategory = "Extreme";
            }
            $scope.resultList.push({
                level: maxUV,
                category: maxCategory
            });
            console.log($scope.resultList[0]);
            console.log($scope.resultList[1]);

            $("#nothing").val("");
            $("#nothing").css("visibility", "visible");
        },
        error: function(response) {
            console.log("error");
        }
        });
    }
}

function select(number) {
    $("#slice1").css("opacity", "0");
    $("#slice2").css("opacity", "0");
    $("#slice3").css("opacity", "0");
    $("#slice4").css("opacity", "0");
    $("#slice5").css("opacity", "0");
    $("#slice6").css("opacity", "0");
    $("#slice7").css("opacity", "0");

    var ele = $("#elevation");
    if (number == 1) {
        var pic = $("#slice1");
        ele.val(0);
    }
    else if (number == 2) {
        var pic = $("#slice2");
        ele.val(100);
    }
    else if (number == 3) {
        var pic = $("#slice3");
        ele.val(300);
    }
    else if (number == 4) {
        var pic = $("#slice4");
        ele.val(500);
    }
    else if (number == 5) {
        var pic = $("#slice5");
        ele.val(1000);
    }
    else if (number == 6) {
        var pic = $("#slice6");
        ele.val(2000);
    }
    else if (number == 7) {
        var pic = $("#slice7");
        ele.val(5000);
    }
    pic.css("opacity", "1");
}

function show(number) {
    if (number == 1) {
        var pic = $("#slice1");
    }
    else if (number == 2) {
        var pic = $("#slice2");
    }
    else if (number == 3) {
        var pic = $("#slice3");
    }
    else if (number == 4) {
        var pic = $("#slice4");
    }
    else if (number == 5) {
        var pic = $("#slice5");
    }
    else if (number == 6) {
        var pic = $("#slice6");
    }
    else if (number == 7) {
        var pic = $("#slice7");
    }
    pic.css("opacity", ".5");
}

function hide(number) {
    if (number == 1) {
        var pic = $("#slice1");
    }
    else if (number == 2) {
        var pic = $("#slice2");
    }
    else if (number == 3) {
        var pic = $("#slice3");
    }
    else if (number == 4) {
        var pic = $("#slice4");
    }
    else if (number == 5) {
        var pic = $("#slice5");
    }
    else if (number == 6) {
        var pic = $("#slice6");
    }
    else if (number == 7) {
        var pic = $("#slice7");
    }
        pic.css("opacity", "0");
}

function updateLat() {
    console.log("updateLat");
    var value = $("#Latitude").val();
    //console.log(value);
    var shape = $("#marker");
    value = parseFloat(value);
    //console.log(value);
    var pix = value * -1.6975 + 422.49;
    //console.log(pix);
    var result = pix + "px";
    console.log(result);
    shape.css("top", result);
}

function updateLong() {
    console.log("updateLong");
    var value = $("#Longitude").val();
    var shape = $("#marker");
    value = parseFloat(value);
    var pix = value * 1.7036 + 332.58;
    var result = pix + "px";
    console.log(result);
    shape.css("left", result);
}
