import * as THREE from "three";
// import { childrensСonnections } from "../../pages/constructor_setings/helpersEvent";

export const HelperCordinates = (scene, width_helper_line) => {
  var axesHelper = new THREE.AxesHelper(width_helper_line);
  scene.add(axesHelper);
};
export const HelperShadowCamera = (scene, shadow) => {
  // Create a helper for the shadow camera (optional)
  var helper = new THREE.CameraHelper(shadow);
  scene.add(helper);
};

export const HelperSphereShadows = (scene) => {
  //Create a sphere that cast shadows (but does not receive them)

  var sphereGeometry = new THREE.SphereBufferGeometry(5, 32, 32);
  var sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.castShadow = true; //default is false
  sphere.receiveShadow = false; //default
  scene.add(sphere);
};
export const HelperPlaneShadows = (scene, light) => {
  //Create a plane that receives shadows (but does not cast them)
  var planeGeometry = new THREE.PlaneBufferGeometry(20, 20, 32, 32);
  var planeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  scene.add(plane);
  let dirLightHeper = new THREE.DirectionalLightHelper(light, 90);
  scene.add(dirLightHeper);
};

export const addCircleToBacground = (
  inner_radius,
  outer_radius,
  number_particles
) => {
  // // create circle to begraund
  var geometry = new THREE.RingGeometry(
    inner_radius,
    outer_radius,
    number_particles
  );
  var material = new THREE.MeshBasicMaterial({
    color: 0x292929,
    side: THREE.DoubleSide,
  });
  var mesh = new THREE.Mesh(geometry, material);

  mesh.up.x = 1;
  mesh.up.y = 4;
  mesh.up.z = 5;
  mesh.rotateX(Math.PI / 2);

  return mesh;
};

export const params = (data) => {
  // convert array => url
  return Object.keys(data)
    .map((key) => `${data[key].name}=${encodeURIComponent(data[key].value)}`)
    .join("&");
};

export const colorBike = (model, config_model) => {
  let bike = model;
  console.log(config_model);

  bike.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = true;
      // o.receiveShadow = true;
      // console.log(o.material.name );
      if (o.material.name.indexOf("Rama_1") !== -1) {

        console.log(config_model.iframe_color );
        

        o.material.color.setHex(`0x${config_model.iframe_color}`);
        o.material.metalness=0.7;
        console.log('Rama_1',o.material );
      } else if (
        o.material.name.indexOf("Bat") !== -1  
      ) {
        // Колір заліза сидіння
        o.material.color.setHex(`0x${config_model.iframe_color}`); 
      } else if (
        o.material.name.indexOf("Seat_velo_2") !== -1 ||
        o.material.name.indexOf("Seat_velo_3") !== -1 ||
        o.material.name.indexOf("Seat_moto_2") !== -1
      ) {

        
        // Колір заліза сидіння
        o.material.color.setHex(`0x${config_model.iframe_color}`);
        o.material.metalness=0.7;
        o.material.roughness=0.5;
         
      } else if (
        o.material.name.indexOf("KolecoZ_2") !== -1 ||
        o.material.name.indexOf("Koleco_2") !== -1 ||
        o.material.name.indexOf("KolecoZ_3") !== -1 ||
        o.material.name.indexOf("Koleco_3") !== -1
        ) {
        // Колір коліс
        o.material.color.setHex(`0x${config_model.wheel_size_color}`);
        o.material.metalness=0.8;
        
      } else if (
        o.material.name.indexOf("Seat_velo_1") !== -1 ||
        o.material.name.indexOf("Seat_moto_1") !== -1
        ) {
        // Колір Сидіння
 
        o.material.color.setHex(`0x${config_model.seat_color}`);
        o.material.metalness=0.1;
        
        }else if (o.material.name.indexOf("Rama_2") !== -1) {
            // Панелі на рамі
            o.material.color.setHex(`0x${config_model.panel_color}`);
            o.material.metalness=0.3;
           
      } else {
         
      }

  
      if (
        o.material.name.indexOf("Seat_moto_1") !== -1 ||
        o.material.name.indexOf("Seat_moto_2") !== -1
      ) {
        if (!!config_model.seat_type ) {
          if (config_model.seat_type === "moto") {
            o.visible = true;
          }else{
            o.visible = false;
          }
        }

        
      }else if(
        o.material.name.indexOf("Seat_velo_1") !== -1 ||
        o.material.name.indexOf("Seat_velo_2") !== -1 ||
        o.material.name.indexOf("Seat_velo_3") !== -1
      ) {
        if (!!config_model.seat_type ) {
          if (config_model.seat_type === "velo") {
            o.visible = true;
          }else{
            o.visible = false;
          }
        }
      }else if( o.material.name.indexOf("Bag") !== -1 ) {
        
        if (config_model.trunk !== "undefined" && config_model.trunk == 'true') {
           
          o.visible = true;
        }else{
          o.visible = false;
        }
        
        
      }else if( o.material.name.indexOf("Mud") !== -1 ) {
        // console.log('Mud',o.name );
        if (config_model.mud !== "undefined"  && config_model.mud == 'true') {
           
         
          o.visible = true;
        }else{
          o.visible = false;
        }
        
        
        
      }else if( o.material.name.indexOf("Bat") !== -1 ) {
        // console.log('Mud',o.name );
        
        if (config_model.mud !== "undefined"  && config_model.battery == 'true') {
           
         
          o.visible = true;
        }else{
          o.visible = false;
        }
        
      }else if( o.material.name.indexOf("Mirror_1") !== -1 || o.material.name.indexOf("Mirror_2") !== -1 ) {
        // console.log('Mirror',config_model.mirrors !== "undefined" );
        if (config_model.mirrors !== "undefined" && config_model.mirrors == 'true') {
           
           
          o.visible = true;
        }else{
          o.visible = false;
        }
      }
      //  console.log(o.material.name );
       
    }
  });

   
  
  return bike;
};

  

export const getFormatUrl = (config_model) =>{
  let URL = Object.keys(config_model)
    .map((key) => {
      // // console.log('key_old',key );

      return `${key}=${encodeURIComponent(config_model[key])}`;
    })
    .join("&");
  return URL;
}


export const filterObject = (config_model)=>{
  let tempObject = {};
     Object.keys(config_model)
      .map((key) => {
       if (key != "not_url" && config_model["not_url"].indexOf(key) === -1) {
          if (key.indexOf("_color") != -1) {
            tempObject[key]= `#${config_model[key]}`;
          } else {
            tempObject[key]= config_model[key];
          }
        }
      }) 
      return tempObject;
}

export const chengePriseModel = (objectParameter) =>{

   
    fetch(`/api/get_price/?${getFormatUrl(objectParameter)}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        function triplets(str) {
          // \u202f — неразрывный узкий пробел
          return str
            .toString()
            .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1\u202f");
        }
        $(".views__parameter_footer")
          .find(".price")
          .children(".value")
          .text(`${triplets(response.price)} грн`);
      });
   

}
export const creteInputHiden = (name,value) => {
  let product_item = document.createElement("input");
  product_item.setAttribute('type', 'hidden');
  product_item.setAttribute('name', name);
  product_item.setAttribute('value', value);
  return product_item;
}

 