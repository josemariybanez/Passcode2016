var app = angular.module('hydroplant', ['ngRoute','angular.morris'])

   app.config(function($routeProvider){
   		$routeProvider
   		.when('/',{
   			templateUrl: 'pages/login.html'
   		})
   		.when('/dashboard',{
           resolve:
            {
               "check": function($location, $window) {
                  //console.log($window.sessionStorage.loggedIn);
                  if(!$window.sessionStorage.loggedIn){
                     $location.path('/');
                  }                  
               }
               
            },
            templateUrl: 'pages/dashboard.html'
            
            
   		})
         .when('/cpanel',{
           resolve:
            {
               "check": function($location, $window) {
                  //console.log($window.sessionStorage.loggedIn);
                  if(!$window.sessionStorage.loggedIn){
                     $location.path('/');
                  }                  
               }
               
            },
            templateUrl: 'pages/cpanel.html'
            
            
         })
   		.otherwise({
   			redirectTo: '/'
   		})
   });


   app.controller('loginController', function($scope, $http, $location, $window){
   		//Variables
   		var username = $scope.username;
   		var password = $scope.password;
   		//Functions
   		$scope.inputVal = function(){
   			$http.get("/php/select.php",{params:{"table": "usertable", "value": $scope.username, "col": "username"}})
   			.success(function(data){
               console.log(data[0].username, data[0].password); 
   				var userdb = data[0].username;
   				var passdb = data[0].password; 				
   				if($scope.username == userdb && $scope.password == passdb){
                  $window.sessionStorage.loggedIn = true;
   					$location.path('/dashboard');
                  //console.log($window.sessionStorage.loggedIn);
				}
				else{
					$location.path('/');
				}

   			})
   			.error(function(err){
   				console.err(err);
   			})
   			
   			
   		};

   });

   app.controller('graphController', function($scope, $rootScope, $interval, $http){
      $interval(dataUpdate,5000);

      //initialize graph and sensor data
      //holding tank data
      //init() graphs
      //holding tank data
      $scope.holding_wtemp_data = [{ time:'0', value: 0  }];
      $scope.holding_etemp_data = [{ time:'0', value: 0  }];
      $scope.holding_ehumidity_data = [{ time:'0', value: 0  }];
      //cleaning tank 1 data
      $scope.tank1_wtemp_data = [{ time:'0', value: 0  }];
      $scope.tank1_etemp_data = [{ time:'0', value: 0  }];
      $scope.tank1_ehumidity_data = [{ time:'0', value: 0  }];  
      $scope.tank1_level_data = [{ y1: 100, y2: 50, a: 'Main' }];     
      //cleaning tank 2 data
      $scope.tank2_wtemp_data = [{ time:'0', value: 0  }];
      $scope.tank2_etemp_data = [{ time:'0', value: 0  }];
      $scope.tank2_epressure_data = [{ time:'0', value: 0  }];  
      $scope.tank2_peris1_data = [{ time:'0', value: 0  }];
      $scope.tank2_peris2_data = [{ time:'0', value: 0  }];
      //cleaning tank 3 data
      $scope.tank3_wtemp_data = [{ time:'0', value: 0  }];
      $scope.tank3_etemp_data = [{ time:'0', value: 0  }];
      $scope.tank3_epressure_data = [{ time:'0', value: 0  }];  
      //end of init

      $rootScope.holding_pump_led = "led-green";
      $rootScope.holding_etemp_led = "led-green";
      $rootScope.holding_wtemp_led = "led-green";
      $rootScope.holding_ehumidity_led = "led-green";

      $rootScope.tank1_wtemp_led = "led-green";
      $rootScope.tank1_etemp_led = "led-green";
      $rootScope.tank1_ehumidity_led = "led-green";
      $rootScope.tank1_level_led = "led-green";
      $rootScope.tank1_pump1_led = "led-green";
      $rootScope.tank1_pump2_led = "led-green";
      $rootScope.tank1_flow_led = "led-green";

      $rootScope.tank2_pump1_led = "led-green";
      $rootScope.tank2_peris1_led = "led-green";
      $rootScope.tank2_peris2_led = "led-green";
      $rootScope.tank2_wtemp_led = "led-green";
      $rootScope.tank2_etemp_led = "led-green";
      $rootScope.tank2_epressure_led = "led-green";
      $rootScope.tank2_level_led = "led-green";
      $rootScope.tank2_stepper_led = "led-green";

      $rootScope.tank3_etemp_led = "led-green";
      $rootScope.tank3_wtemp_led = "led-green";
      $rootScope.tank3_epressure_led = "led-green";
      $rootScope.tank3_uv_panel = "led-green";
      $rootScope.tank3_uv_array = "led-green";
      $rootScope.tank3_pump_led = "led-green";
      $rootScope.tank3_bubbler1_led = "led-green"
      $rootScope.tank3_bubbler2_led = "led-green"

      $http.get("/php/read.php")
      .success(function(data){
         for(var i = 0; i < data.length; i++){
            if(data[i].location == 0){
               if(data[i].id == 1){
                  $rootScope.tank3_uv_panel = "led-red";
               }else if(data[i].id == 2){

               }else{
                  if(data[i].state){
                     $rootScope.holding_pump_led = "led-green";
                  }else{
                     $rootScope.holding_pump_led = "led-red";
                  }
               }
            }
            else{
               if(data[i].id == 1){
                  if(data[i].state){
                     $rootScope.tank3_pump_led = "led-green";
                  }else{
                     $rootScope.tank3_pump_led = "led-red";
                  }
               }else if(data[i].id == 2){
                  if(data[i].state){
                     $rootScope.tank2_pump_led = "led-green";
                  }else{
                     $rootScope.tank2_pump_led = "led-red";
                  }
               }else if(data[i].id == 3){
                  if(data[i].state){
                     $rootScope.tank3_bubbler1_led = "led-green"                     
                  }else{
                     $rootScope.tank3_bubbler1_led = "led-red"                     
                  }
               }else if(data[i].id == 4){
                  if(data[i].state){
                     $rootScope.tank3_bubbler2_led = "led-green"
                  }else{
                     $rootScope.tank3_bubbler2_led = "led-red"
                  }
               }else if(data[i].id == 5){
                  if(data[i].state){
                     $rootScope.tank1_pump1_led = "led-green";                     
                  }else{
                     $rootScope.tank1_pump1_led = "led-red";                     
                  }
               }else{
                  if(data[i].state){
                     $rootScope.tank1_pump2_led = "led-green";
                  }else{
                     $rootScope.tank1_pump2_led = "led-red";
                  }
               }
            }
         }
      })


      function dataUpdate(){

         //get data from database page and update $scope
         $http.get("/php/select.php",{params:{"value": "holding1", "table": "sensors", "col": "tank"}})
         .success(function(data){
            if($scope.holding_wtemp_data.length >= 5){
               $scope.holding_wtemp_data = [{ time: data[4].timestamp, value: data[4].water_temp}];
               $scope.holding_etemp_data = [{ time: data[4].timestamp, value: data[4].env_temp}];
               $scope.holding_ehumidity_data = [{ time: data[4].timestamp, value: data[4].env_humidity}];  
            }
            for(var i=data.length-1; i >= 0; i--){
               $scope.holding_wtemp_data = $scope.holding_wtemp_data.concat([{ time: data[i].timestamp, value: data[i].water_temp}]);
               $scope.holding_etemp_data = $scope.holding_etemp_data.concat([{ time: data[i].timestamp, value: data[i].env_temp}]);
               $scope.holding_ehumidity_data = $scope.holding_ehumidity_data.concat([{ time: data[i].timestamp, value: data[i].env_humidity}]);  
            } 

            console.log("etemp: "+data[0].env_temp);
            $scope.holding_current_wtemp = data[0].water_temp;
            $scope.holding_current_etemp = data[0].env_temp;
            $scope.holding_current_ehumidity = data[0].env_humidity;

         })
         .error(function(err){
            console.err(err);
         })
         $http.get("/php/select.php",{params:{"value": "tank1", "table": "sensors", "col": "tank"}})
         .success(function(data){  
            
            if($scope.tank1_wtemp_data.length >= 5){

               $scope.tank1_wtemp_data = [{ time: data[4].timestamp, value: data[4].water_temp}];
               $scope.tank1_etemp_data = [{ time: data[4].timestamp, value: data[4].env_temp}];
               $scope.tank1_ehumidity_data = [{ time: data[4].timestamp, value: data[4].env_humidity}];  
               $scope.tank1_level_data = [{ y1: 100, y2: data[4].water_level, a: 'Water Level' }];
            }
            for(var i=data.length-1; i >= 0; i--){
               $scope.tank1_wtemp_data = $scope.tank1_wtemp_data.concat([{ time: data[i].timestamp, value: data[i].water_temp}]);
               $scope.tank1_etemp_data = $scope.tank1_etemp_data.concat([{ time: data[i].timestamp, value: data[i].env_temp}]);
               $scope.tank1_ehumidity_data = $scope.tank1_ehumidity_data.concat([{ time: data[i].timestamp, value: data[i].env_humidity}]);  
               $scope.tank1_level_data = [{ y1: 100, y2: data[i].water_level, a: 'Water Level' }]; 
            }

            $scope.tank1_current_wtemp = data[0].water_temp;
            $scope.tank1_current_etemp = data[0].env_temp;
            $scope.tank1_current_ehumidity = data[0].env_humidity;
            $scope.tank1_current_level = data[0].water_level;
            $scope.tank1_current_flow = data[0].water_flow;
            $scope.tank1_current_timestamp = data[0].timestamp;
     
         })
         .error(function(err){
            console.err(err);
         })
         $http.get("/php/select.php",{params:{"value": "tank2", "table": "sensors", "col": "tank"}})
         .success(function(data){
            if($scope.tank2_wtemp_data.length >= 5){
               $scope.tank2_wtemp_data = [{ time: data[4].timestamp, value: data[4].water_temp}];
               $scope.tank2_etemp_data = [{ time: data[4].timestamp, value: data[4].env_temp}];
               $scope.tank2_epressure_data = [{ time: data[4].timestamp, value: data[4].env_pressure}];  
               $scope.tank2_peris1_data = [{ time: data[4].timestamp, value: data[4].injector1}];
               $scope.tank2_peris2_data = [{ time: data[4].timestamp, value: data[4].injector2}];
            }
            for(var i=data.length-1; i >= 0; i--){
               $scope.tank2_wtemp_data = $scope.tank2_wtemp_data.concat([{ time: data[i].timestamp, value: data[i].water_temp}]);
               $scope.tank2_etemp_data = $scope.tank2_etemp_data.concat([{ time: data[i].timestamp, value: data[i].env_temp}]);
               $scope.tank2_epressure_data = $scope.tank2_epressure_data.concat([{ time: data[i].timestamp, value: data[i].env_pressure}]);  
               $scope.tank2_peris1_data = $scope.tank2_peris1_data.concat([{ time: data[i].timestamp, value: data[i].injector1}]);
               $scope.tank2_peris2_data = $scope.tank2_peris2_data.concat([{ time: data[i].timestamp, value: data[i].injector2}]);
            }  

            $scope.tank2_current_wtemp = data[0].water_temp;
            $scope.tank2_current_etemp = data[0].env_temp;
            $scope.tank2_current_epressure = data[0].env_pressure;
            $scope.tank2_current_peris1 = data[0].injector1;
            $scope.tank2_current_peris2 = data[0].injector2;
         })
         .error(function(err){
            console.err(err);
         })
         $http.get("/php/select.php",{params:{"value": "tank3", "table": "sensors", "col": "tank"}})
         .success(function(data){               
            if($scope.tank3_wtemp_data.length >= 5){
               $scope.tank3_wtemp_data = [{ time: data[4].timestamp, value: data[4].water_temp}];
               $scope.tank3_etemp_data = [{ time: data[4].timestamp, value: data[4].env_temp}];
               $scope.tank3_epressure_data = [{ time: data[4].timestamp, value: data[4].env_pressure}];  
            }
            for(var i=data.length-1; i >= 0; i--){
               $scope.tank3_wtemp_data = $scope.tank3_wtemp_data.concat([{ time: data[i].timestamp, value: data[i].water_temp}]);
               $scope.tank3_etemp_data = $scope.tank3_etemp_data.concat([{ time: data[i].timestamp, value: data[i].env_temp}]);
               $scope.tank3_epressure_data = $scope.tank3_epressure_data.concat([{ time: data[i].timestamp, value: data[i].env_pressure}]);  
            }    

            $scope.tank3_current_wtemp = data[0].water_temp;
            $scope.tank3_current_etemp = data[0].env_temp;
            $scope.tank3_current_epressure = data[0].env_pressure;
         })
         .error(function(err){
            console.err(err);
         })
         //end of DB/scope update

         //update the LED based on the limit sensors
         //grab data from database compare and update
         $http.get("/php/select.php",{params:{"value": "tank3", "table": "limits", "col": "tank"}})
         .success(function(data){
            for(var i = data.length-1; i >= 0; i--){
               switch(data[i].sensor){
                  case "env_temp": 
                     if(data[i].min >= $scope.tank3_current_etemp || data[i].max <= $scope.tank3_current_etemp){
                        $rootScope.tank3_etemp_led = "led-red";                       
                     }
                     else{
                        $rootScope.tank3_etemp_led = "led-green"; 
                     }
                     break;
                  case "water_temp": 
                     if(data[i].min >= $scope.tank3_current_wtemp || data[i].max <= $scope.tank3_current_wtemp){
                        $rootScope.tank3_wtemp_led = "led-red";                       
                     }
                     else{
                        $rootScope.tank3_wtemp_led = "led-green"; 
                     }
                     break;
                  case "env_pressure": 
                     if(data[i].min >= $scope.tank3_current_epressure || data[i].max <= $scope.tank3_current_epressure){
                        $rootScope.tank3_epressure_led = "led-red";                       
                     }
                     else{
                        $rootScope.tank3_epressure_led = "led-green"; 
                     }
                     break;
               }
            }


         })
         .error(function(err){
            console.err(err);
         })
         $http.get("/php/select.php",{params:{"value": "tank2", "table": "limits", "col": "tank"}})
         .success(function(data){
            for(var i = data.length-1; i >= 0; i--){
               switch(data[i].sensor){
                  case "env_temp": 
                     if(data[i].min >= $scope.tank2_current_etemp || data[i].max <= $scope.tank2_current_etemp){
                        $rootScope.tank2_etemp_led = "led-red";                       
                     }
                     else{
                        $rootScope.tank2_etemp_led = "led-green"; 
                     }
                     break;
                  case "water_temp": 
                     if(data[i].min >= $scope.tank2_current_wtemp || data[i].max <= $scope.tank2_current_wtemp){
                        $rootScope.tank2_wtemp_led = "led-red";                       
                     }
                     else{
                        $rootScope.tank2_wtemp_led = "led-green"; 
                     }
                     break;
               }
            }

         })


         .error(function(err){
            console.err(err);
         })
         $http.get("/php/select.php",{params:{"value": "holding1", "table": "limits", "col": "tank"}})
         .success(function(data){
            for(var i = data.length-1; i >= 0; i--){
               switch(data[i].sensor){
                  case "env_temp": 
                     if(data[i].min >= $scope.holding_current_etemp || data[i].max <= $scope.holding_current_etemp){
                        $rootScope.holding_etemp_led = "led-red";                       
                     }
                     else{
                        $rootScope.holding_etemp_led = "led-green"; 
                     }
                     break;
                  case "water_temp": 
                     if(data[i].min >= $scope.holding_current_wtemp || data[i].max <= $scope.holding_current_wtemp){
                        $rootScope.holding_wtemp_led = "led-red";                       
                     }
                     else{
                        $rootScope.holding_wtemp_led = "led-green"; 
                     }
                     break;
                  case "env_humidity": 
                     if(data[i].min >= $scope.holding_current_ehumidity || data[i].max <= $scope.holding_current_ehumidity){
                        $rootScope.holding_ehumidity_led = "led-red";                       
                     }
                     else{
                        $rootScope.holding_ehumidity_led = "led-green"; 
                     }
                     break;
                  
               }
            }


         })
         .error(function(err){
            console.err(err);
         })
         $http.get("/php/select.php",{params:{"value": "tank1", "table": "limits", "col": "tank"}})
         .success(function(data){
            for(var i = data.length-1; i >= 0; i--){
               switch(data[i].sensor){
                  case "env_temp": 
                     if(data[i].min >= $scope.tank1_current_etemp || data[i].max <= $scope.tank1_current_etemp){
                        $rootScope.tank1_etemp_led = "led-red";                       
                     }
                     else{
                        $rootScope.tank1_etemp_led = "led-green"; 
                     }
                     break;

                  case "water_temp": 
                     if(data[i].min >= $scope.tank1_current_wtemp || data[i].max <= $scope.tank1_current_wtemp){
                        $rootScope.tank1_wtemp_led = "led-red";                       
                     }
                     else{
                        $rootScope.tank1_wtemp_led = "led-green"; 
                     }
                     break;
                  case "env_humidity":
                     if(data[i].min >= $scope.tank1_current_ehumidity || data[i].max <= $scope.tank1_current_ehumidity){
                        $rootScope.tank1_ehumidity_led = "led-red";                       
                     }
                     else{
                        $rootScope.tank1_ehumidity_led = "led-green"; 
                     } 
                     break;
                  case "water_level": 
                     if(data[i].min >= $scope.tank1_current_level || data[i].max <= $scope.tank1_current_level){
                        $rootScope.tank1_level_led = "led-red";                       
                     }
                     else{
                        $rootScope.tank1_level_led = "led-green"; 
                     }
                     break;
               }
            }
            if($scope.tank1_current_flow){
               $rootScope.tank1_flow_led = "led-green";
            }
            else{
               $rootScope.tank1_flow_led = "led-red";
            }

         })
         .error(function(err){
            console.err(err);
         })
         //end of LED update

         //grab pump values
         $http.get("")

      }
   });

   app.controller('cpanelController', function($scope, $http, $location, $window, $rootScope){

      $rootScope.holding_pump_led = "led-green";
      $rootScope.holding_etemp_led = "led-green";
      $rootScope.holding_wtemp_led = "led-green";
      $rootScope.holding_ehumidity_led = "led-green";

      $rootScope.tank1_wtemp_led = "led-green";
      $rootScope.tank1_etemp_led = "led-green";
      $rootScope.tank1_ehumidity_led = "led-green";
      $rootScope.tank1_level_led = "led-green";
      $rootScope.tank1_pump1_led = "led-green";
      $rootScope.tank1_pump2_led = "led-green";
      $rootScope.tank1_flow_led = "led-green";

      $rootScope.tank2_pump1_led = "led-green";
      $rootScope.tank2_peris1_led = "led-green";
      $rootScope.tank2_peris2_led = "led-green";
      $rootScope.tank2_wtemp_led = "led-green";
      $rootScope.tank2_etemp_led = "led-green";
      $rootScope.tank2_epressure_led = "led-green";
      $rootScope.tank2_level_led = "led-green";
      $rootScope.tank2_stepper_led = "led-green";

      $rootScope.tank3_etemp_led = "led-green";
      $rootScope.tank3_wtemp_led = "led-green";
      $rootScope.tank3_epressure_led = "led-green";
      $rootScope.tank3_uv_panel = "led-green";
      $rootScope.tank3_uv_array = "led-green";
      $rootScope.tank3_pump_led = "led-green";
      $rootScope.tank3_bubbler1_led = "led-green"
      $rootScope.tank3_bubbler2_led = "led-green"

      $http.get("/php/read.php")
      .success(function(data){
         for(var i = 0; i < data.length; i++){
            if(data[i].location == 0){
               if(data[i].id == 1){
                  $rootScope.tank3_uv_panel = "led-red";
               }else if(data[i].id == 2){

               }else{
                  if(data[i].state){
                     $rootScope.holding_pump_led = "led-green";
                  }else{
                     $rootScope.holding_pump_led = "led-red";
                  }
               }
            }
            else{
               if(data[i].id == 1){
                  if(data[i].state){
                     $rootScope.tank3_pump_led = "led-green";
                  }else{
                     $rootScope.tank3_pump_led = "led-red";
                  }
               }else if(data[i].id == 2){
                  if(data[i].state){
                     $rootScope.tank2_pump_led = "led-green";
                  }else{
                     $rootScope.tank2_pump_led = "led-red";
                  }
               }else if(data[i].id == 3){
                  if(data[i].state){
                     $rootScope.tank3_bubbler1_led = "led-green"                     
                  }else{
                     $rootScope.tank3_bubbler1_led = "led-red"                     
                  }
               }else if(data[i].id == 4){
                  if(data[i].state){
                     $rootScope.tank3_bubbler2_led = "led-green"
                  }else{
                     $rootScope.tank3_bubbler2_led = "led-red"
                  }
               }else if(data[i].id == 5){
                  if(data[i].state){
                     $rootScope.tank1_pump1_led = "led-green";                     
                  }else{
                     $rootScope.tank1_pump1_led = "led-red";                     
                  }
               }else{
                  if(data[i].state){
                     $rootScope.tank1_pump2_led = "led-green";
                  }else{
                     $rootScope.tank1_pump2_led = "led-red";
                  }
               }
            }
         }
      })  

      var holding_values = [""];
      var tank1_values = [""];
      var tank2_values = [""];
      var tank3_values = [""];

      //grab initial value of limits to determine 
      //an insert or an update query
      $http.get("/php/select.php",{params:{"value": "holding1", "table": "limits", "col": "tank"}})
      .success(function(data){
         for(var i = 0; i < data.length; i++){
            if(data[i].sensor){
               holding_values[i] = data[i].sensor;
               switch(data[i].sensor){
                  case "env_temp": $scope.holding_etemp_actions = data[i].action; $scope.holding_input_etemp_low = data[i].min; $scope.holding_input_etemp_high = data[i].max; break;
                  case "water_temp": $scope.holding_wtemp_actions = data[i].action; $scope.holding_input_wtemp_low = data[i].min; $scope.holding_input_wtemp_high = data[i].max; break;
                  case "env_humidity": $scope.holding_ehumidity_actions = data[i].action; $scope.holding_input_ehumidity_low = data[i].min; $scope.holding_input_ehumidity_high = data[i].max; break;
               }                  
            }                     
         }

      })
      .error(function(err){
         console.err(err);
      })        
      $http.get("/php/select.php",{params:{"value": "tank1", "table": "limits", "col": "tank"}})
      .success(function(data){
         for(var i = 0; i < data.length; i++){
            if(data[i].sensor){
               tank1_values[i] = data[i].sensor;
               switch(data[i].sensor){
                  case "env_temp": $scope.tank1_etemp_actions = data[i].action; $scope.tank1_input_etemp_low = data[i].min; $scope.tank1_input_etemp_high = data[i].max; break;
                  case "water_temp": $scope.tank1_wtemp_actions = data[i].action; $scope.tank1_input_wtemp_low = data[i].min; $scope.tank1_input_wtemp_high = data[i].max; break;
                  case "water_level": $scope.tank1_wlevel_actions = data[i].action; $scope.tank1_input_level_low = data[i].min; $scope.tank1_input_level_high = data[i].max; break;
                  case "water_flow": $scope.tank1_wflow_actions = data[i].action; $scope.tank1_input_flow_low = data[i].min; $scope.tank1_input_flow_high = data[i].max; break;
                  case "env_pressure": $scope.tank1_epressure_actions = data[i].action; $scope.tank1_input_epressure_low = data[i].min; $scope.tank1_input_epressure_high = data[i].max; break;
               }
            }            
         }
      })
      .error(function(err){
         console.err(err);
      }) 
      $http.get("/php/select.php",{params:{"value": "tank2", "table": "limits", "col": "tank"}})
      .success(function(data){
         for(var i = 0; i < data.length; i++){
            if(data[i].sensor){
               tank2_values[i] = data[i].sensor; 
               switch(data[i].sensor){
                  case "env_temp": $scope.tank2_etemp_actions = data[i].action; $scope.tank2_input_etemp_low = data[i].min; $scope.tank2_input_etemp_high = data[i].max; break;
                  case "water_temp": $scope.tank2_wtemp_actions = data[i].action; $scope.tank2_input_wtemp_low = data[i].min; $scope.tank2_input_wtemp_high = data[i].max; break;
                  case "env_pressure": $scope.tank2_epressure_actions = data[i].action; $scope.tank2_input_epressure_low = data[i].min; $scope.tank2_input_epressure_high = data[i].max; break;
               }  
            }                     
         } 
      })
      .error(function(err){
         console.err(err);
      }) 
      $http.get("/php/select.php",{params:{"value": "tank3", "table": "limits", "col": "tank"}})
      .success(function(data){
         for(var i = 0; i < data.length; i++){
            if(data[i].sensor){
               tank3_values[i] = data[i].sensor;
               switch(data[i].sensor){
                  case "env_temp": $scope.tank3_etemp_actions = data[i].action; $scope.tank3_input_etemp_low = data[i].min; $scope.tank3_input_etemp_high = data[i].max; break;
                  case "water_temp": $scope.tank3_wtemp_actions = data[i].action; $scope.tank3_input_wtemp_low = data[i].min; $scope.tank3_input_wtemp_high = data[i].max; break;
                  case "env_pressure": $scope.tank3_epressure_actions = data[i].action; $scope.tank3_input_epressure_low = data[i].min; $scope.tank3_input_epressure_high = data[i].max; break;
               }    
            }                     
         } 
      })
      .error(function(err){
         console.err(err);
      }) 

      $scope.toggle = function(value,id){
         switch(id.target.id){
            case "holding_pump": 
               if(value == "led-green"){
                  $scope.holding_pump_led = "led-red";
                  $rootScope.holding_pump_led = "led-red";
               }else{
                  $scope.holding_pump_led = "led-green";
                  $rootScope.holding_pump_led = "led-green";
               }
               break;

            case "tank1_pump1": 
               if(value == "led-green"){
                  $scope.tank1_pump1_led = "led-red";
                  $rootScope.tank1_pump1_led = "led-red";
               }else{
                  $scope.tank1_pump1_led = "led-green";
                  $rootScope.tank1_pump1_led = "led-green";
               }
            break;
            case "tank1_pump2": 
               if(value == "led-green"){
                  $scope.tank1_pump2_led = "led-red";
                  $rootScope.tank1_pump2_led = "led-red";
               }else{
                  $scope.tank1_pump2_led = "led-green";
                  $rootScope.tank1_pump2_led = "led-green";
               }
            break;

            case "tank2_pump1": 
               if(value == "led-green"){
                  $scope.tank2_pump1_led = "led-red";
                  $rootScope.tank2_pump1_led = "led-red";
               }else{
                  $scope.tank2_pump1_led = "led-green";
                  $rootScope.tank2_pump1_led = "led-green";
               }
            break;
            case "tank2_peris1": 
               if(value == "led-green"){
                  $scope.tank2_peris1_led = "led-red";
                  $rootScope.tank2_peris1_led = "led-red";
               }else{
                  $scope.tank2_peris1_led = "led-green";
                  $rootScope.tank2_peris1_led = "led-green";
               }
            break;
            case "tank2_peris2": 
               if(value == "led-green"){
                  $scope.tank2_peris2_led = "led-red";
                  $rootScope.tank2_peris2_led = "led-red";
               }else{
                  $scope.tank2_peris2_led = "led-green";
                  $rootScope.tank2_peris2_led = "led-green";
               }
            break;

            case "tank3_uv_panel": 
               if(value == "led-green"){
                  $scope.tank3_uv_panel = "led-red";
                  $rootScope.tank3_uv_panel = "led-red";
               }else{
                  $scope.tank3_uv_panel = "led-green";
                  $rootScope.tank3_uv_panel = "led-green";
               }
            break;
            case "tank3_uv_array": 
               if(value == "led-green"){
                  $scope.tank3_uv_array = "led-red";
                  $rootScope.tank3_uv_array = "led-red";
               }else{
                  $scope.tank3_uv_array = "led-green";
                  $rootScope.tank3_uv_array = "led-green";
               }
            break;
            case "tank3_pump": 
               if(value == "led-green"){
                  $scope.tank3_pump_led = "led-red";
                  $rootScope.tank3_pump_led = "led-red";
               }else{
                  $scope.tank3_pump_led = "led-green";
                  $rootScope.tank3_pump_led = "led-green";
               }
            break;
            case "tank3_bubbler1": 
               if(value == "led-green"){
                  $scope.tank3_bubbler1_led = "led-red";
                  $rootScope.tank3_bubbler1_led = "led-red";
               }else{
                  $scope.tank3_bubbler1_led = "led-green";
                  $rootScope.tank3_bubbler1_led = "led-green";
               }
            break;
            case "tank3_bubbler2": 
               if(value == "led-green"){
                  $scope.tank3_bubbler2_led = "led-red";
                  $rootScope.tank3_bubbler2_led = "led-red";
               }else{
                  $scope.tank3_bubbler2_led = "led-green";
                  $rootScope.tank3_bubbler2_led = "led-green";
               }
            break;

         }
         console.log("value: "+value);
         console.log("id: "+id.target.id);
      };

      $scope.panelInput = function(){

         switch($scope.tankDropdown){
            case "holding":
               var action = -1;
               if($scope.holding_pump_led === "led-green"){
                  action = 1;
               }else{
                  action = 2;
               }
               $http.post("php/read.php",{params:{'location': "0",'id': "3",'action': action}})                     
               .success(function(){
                        
               })

               console.log($scope.holding_pump_led);
               if($scope.h1sensorDropdown === "wtemp"){
                  //check if there is a water temp entry in the holding tank
                  //if there isnt one do an insert statement
                  //if there is one do an update statement
                  if(holding_values.indexOf("water_temp") == -1){
                     $http.post("/php/insert.php",{'min': $scope.holding_input_wtemp_low, 'max': $scope.holding_input_wtemp_high, 'tank': "holding1", 'sensor': "water_temp", 'action': $scope.holding_wtemp_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
                  else{

                     $http.post("/php/update.php",{'min': $scope.holding_input_wtemp_low, 'max': $scope.holding_input_wtemp_high, 'tank': "holding1", 'sensor': "water_temp", 'action': $scope.holding_wtemp_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
                  
               }
               if($scope.h1sensorDropdown === "etemp"){
                  if(holding_values.indexOf("env_temp") == -1){
                     $http.post("/php/insert.php",{'min': $scope.holding_input_etemp_low, 'max': $scope.holding_input_etemp_high, 'tank': "holding1", 'sensor': "env_temp", 'action': $scope.holding_etemp_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
                  else{
                     $http.post("/php/update.php",{'min': $scope.holding_input_wtemp_low, 'max': $scope.holding_input_etemp_high, 'tank': "holding1", 'sensor': "env_temp", 'action': $scope.holding_etemp_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }

               }
               if($scope.h1sensorDropdown === "ehumidity"){
                  if(holding_values.indexOf("env_humidity") == -1){
                     $http.post("/php/insert.php",{'min': $scope.holding_input_ehumidity_low, 'max': $scope.holding_input_ehumidity_high, 'tank': "holding1", 'sensor': "ehumidity", 'action': $scope.holding_ehumidity_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
                  else{
                     $http.post("/php/update.php",{'min': $scope.holding_input_wtemp_low, 'max': $scope.holding_input_ehumidity_high, 'tank': "holding1", 'sensor': "ehumidity", 'action': $scope.holding_ehumidity_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
               }
               break;
            case "tank1": 
               var pump1action = -1;
               var pump2action = -1;
               if($scope.tank1_pump1_led === "led-green"){
                  pump1action = 1;
               }else{
                  pump1action = 2;
               }
               if($scope.tank1_pump2_led === "led-green"){
                  pump2action = 1;
               }else{
                  pump2action = 2;
               }
               $http.post("php/read.php",{params:{'location': "1",'id': "5",'action': pump1action}})                     
               .success(function(){
                        
               })
               $http.post("php/read.php",{params:{'location': "1",'id': "6",'action': pump2action}})                     
               .success(function(){
                        
               })
               if($scope.t1sensorDropdown === "wtemp"){
                  //check if there is a water temp entry in tank1
                  //if there isnt one do an insert statement
                  //if there is one do an update statement
                  if(tank1_values.indexOf("water_temp") == -1){
                     $http.post("/php/insert.php",{'min': $scope.tank1_input_wtemp_low, 'max': $scope.tank1_input_wtemp_high, 'tank': "tank1", 'sensor': "water_temp", 'action': $scope.tank1_wtemp_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
                  else{
                     $http.post("/php/update.php",{'min': $scope.tank1_input_wtemp_low, 'max': $scope.tank1_input_wtemp_high, 'tank': "tank1", 'sensor': "water_temp", 'action': $scope.tank1_wtemp_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })                  
                  }
                  
               }
               if($scope.t1sensorDropdown === "etemp"){
                  if(tank1_values.indexOf("env_temp") == -1){
                     $http.post("/php/insert.php",{'min': $scope.tank1_input_etemp_low, 'max': $scope.tank1_input_etemp_high, 'tank': "tank1", 'sensor': "env_temp", 'action': $scope.tank1_etemp_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
                  else{
                     $http.post("/php/update.php",{'min': $scope.tank1_input_etemp_low, 'max': $scope.tank1_input_etemp_high, 'tank': "tank1", 'sensor': "env_temp", 'action': $scope.tank1_etemp_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })                  
                  }

               }
               if($scope.t1sensorDropdown === "epressure"){
                  if(tank1_values.indexOf("env_pressure") == -1){
                     $http.post("/php/insert.php",{'min': $scope.tank1_input_epressure_low, 'max': $scope.tank1_input_epressure_high, 'tank': "tank1", 'sensor': "env_pressure", 'action': $scope.tank1_epressure_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
                  else{
                     $http.post("/php/update.php",{'min': $scope.tank1_input_epressure_low, 'max': $scope.tank1_input_epressure_high, 'tank': "tank1", 'sensor': "env_pressure", 'action': $scope.tank1_epressure_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
               }
               if($scope.t1sensorDropdown === "wflow"){
                  if(tank1_values.indexOf("water_flow") == -1){
                     $http.post("/php/insert.php",{'min': $scope.tank1_input_flow_low, 'max': $scope.tank1_input_flow_high, 'tank': "tank1", 'sensor': "water_flow", 'action': $scope.tank1_wflow_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
                  else{
                     $http.post("/php/update.php",{'min': $scope.tank1_input_flow_low, 'max': $scope.tank1_input_flow_high, 'tank': "tank1", 'sensor': "water_flow", 'action': $scope.tank1_wflow_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
               }
               if($scope.t1sensorDropdown === "wlevel"){
                  if(tank1_values.indexOf("water_level") == -1){
                     $http.post("/php/insert.php",{'min': $scope.tank1_input_level_low, 'max': $scope.tank1_input_level_high, 'tank': "tank1", 'sensor': "water_level", 'action': $scope.tank1_wlevel_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
                  else{
                     $http.post("/php/update.php",{'min': $scope.tank1_input_level_low, 'max': $scope.tank1_input_level_high, 'tank': "tank1", 'sensor': "water_level", 'action': $scope.tank1_wlevel_actions},{params:{"table": "limits"}})                     
                     .success(function(){
                        
                     })
                  }
               }
               break;
            case "tank2":
               var pump1action = -1;

               if($scope.tank2_pump1_led === "led-green"){
                  pump1action = 1;
               }else{
                  pump1action = 2;
               }
               $http.post("php/read.php",{params:{'location': "1",'id': "2",'action': pump1action}})                     
               .success(function(){
                        
               })

               if($scope.t2sensorDropdown === "wtemp"){
                  //check if there is a water temp entry in tank2
                  //if there isnt one do an insert statement
                  //if there is one do an update statement
                  if(tank2_values.indexOf("water_temp") == -1){
                     $http.post("/php/insert.php",{'min': $scope.tank2_input_wtemp_low, 'max': $scope.tank2_input_wtemp_high, 'tank': "tank2", 'sensor': "water_temp", 'action': $scope.tank2_wtemp_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
                  else{
                     $http.post("/php/update.php",{'min': $scope.tank2_input_wtemp_low, 'max': $scope.tank2_input_wtemp_high, 'tank': "tank2", 'sensor': "water_temp", 'action': $scope.tank2_wtemp_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })                  
                  }
                  
               }
               if($scope.t2sensorDropdown === "etemp"){
                  if(tank2_values.indexOf("env_temp") == -1){
                     $http.post("/php/insert.php",{'min': $scope.tank2_input_etemp_low, 'max': $scope.tank2_input_etemp_high, 'tank': "tank2", 'sensor': "env_temp", 'action': $scope.tank2_etemp_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
                  else{
                     $http.post("/php/update.php",{'min': $scope.tank2_input_etemp_low, 'max': $scope.tank2_input_etemp_high, 'tank': "tank2", 'sensor': "env_temp", 'action': $scope.tank2_etemp_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })                  
                  }

               }
               if($scope.t2sensorDropdown === "epressure"){
                  if(tank2_values.indexOf("env_pressure") == -1){
                     $http.post("/php/insert.php",{'min': $scope.tank2_input_epressure_low, 'max': $scope.tank2_input_epressure_high, 'tank': "tank2", 'sensor': "env_pressure", 'action': $scope.tank2_epressure_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
                  else{
                     $http.post("/php/update.php",{'min': $scope.tank2_input_epressure_low, 'max': $scope.tank2_input_epressure_high, 'tank': "tank2", 'sensor': "env_pressure", 'action': $scope.tank2_epressure_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
               }
               break;
            case "tank3": 
               var pump1action = -1;
               var arrayaction = -1;
               var bubbler1action = -1;
               var bubbler2action = -1;

               if($scope.tank3_pump_led === "led-green"){
                  pump1action = 1;
               }else{
                  pump1action = 2;
               }
               if($scope.tank3_uv_array === "led-green"){
                  pump1action = 1;
               }else{
                  pump1action = 2;
               }
               if($scope.tank3_uv_array === "led-green"){
                  bubbler1action = 1;
               }else{
                  bubbler1action = 2;
               }
               if($scope.tank3_uv_array === "led-green"){
                  bubbler2action = 1;
               }else{
                  bubbler2action = 2;
               }

               $http.post("php/read.php",{params:{'location': "1",'id': "1",'action': pump1action}})                     
               .success(function(){
                        
               })
               $http.post("php/read.php",{params:{'location': "0",'id': "2",'action': arrayaction}})                     
               .success(function(){
                        
               })
               $http.post("php/read.php",{params:{'location': "1",'id': "3",'action': bubbler1action}})                     
               .success(function(){
                        
               })
               $http.post("php/read.php",{params:{'location': "1",'id': "4",'action': bubbler2action}})                     
               .success(function(){
                        
               })

              console.log($scope.tank3_uv_panel);
              console.log($scope.tank3_uv_array);
              console.log($scope.tank3_pump_led);
              if($scope.t3sensorDropdown === "wtemp"){
                  //check if there is a water temp entry in tank2
                  //if there isnt one do an insert statement
                  //if there is one do an update statement
                  if(tank3_values.indexOf("water_temp") == -1){
                     $http.post("/php/insert.php",{'min': $scope.tank3_input_wtemp_low, 'max': $scope.tank3_input_wtemp_high, 'tank': "tank3", 'sensor': "water_temp", 'action': $scope.tank3_wtemp_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
                  else{
                     $http.post("/php/update.php",{'min': $scope.tank3_input_wtemp_low, 'max': $scope.tank3_input_wtemp_high, 'tank': "tank3", 'sensor': "water_temp", 'action': $scope.tank3_wtemp_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })                  
                  }
                  
               }
               if($scope.t3sensorDropdown === "etemp"){
                  if(tank2_values.indexOf("env_temp") == -1){
                     $http.post("/php/insert.php",{'min': $scope.tank3_input_etemp_low, 'max': $scope.tank3_input_etemp_high, 'tank': "tank3", 'sensor': "env_temp", 'action': $scope.tank3_etemp_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
                  else{
                     $http.post("/php/update.php",{'min': $scope.tank3_input_etemp_low, 'max': $scope.tank3_input_etemp_high, 'tank': "tank3", 'sensor': "env_temp", 'action': $scope.tank3_etemp_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })                  
                  }

               }
               if($scope.t3sensorDropdown === "epressure"){
                  if(tank2_values.indexOf("env_pressure") == -1){
                     $http.post("/php/insert.php",{'min': $scope.tank3_input_epressure_low, 'max': $scope.tank3_input_epressure_high, 'tank': "tank3", 'sensor': "env_pressure", 'action': $scope.tank3_epressure_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
                  else{
                     $http.post("/php/update.php",{'min': $scope.tank3_input_epressure_low, 'max': $scope.tank3_input_epressure_high, 'tank': "tank3", 'sensor': "env_pressure", 'action': $scope.tank3_epressure_actions},{params:{"table": "limits"}})
                     .success(function(){
                        
                     })
                  }
               }
               break;

         }

      }

   });




