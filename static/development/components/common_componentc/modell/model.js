import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import * as TWEEN from '@tweenjs/tween.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import {
  addCircleToBacground,
  HelperCordinates,
  HelperShadowCamera,
  HelperPlaneShadows,
  HelperSphereShadows,
  params,
  colorBike,
  getFormatUrl,
  filterObject,
  chengePriseModel,
  creteInputHiden,
} from "./helper";
import {
  onClickCheckboxOptions,
  childrensСonnections,
} from "../../pages/constructor_setings/helpersEvent";

let params_search = window.location.search.split("?")[1].split("&");
let config_model = {
  not_url: ["url"],
};

params_search.map((item) => {
  let param = item.split("=");
  if (!!param[0]) {
    param[1] = param[1].replace("%23", "");
    param[1] = param[1].replace("%20", "");

    config_model[param[0]] = param[1];
  }
});

if (config_model.iframe_type === "pozitiff") {
  config_model["url"] = "/static/source/model/Pozitif.gltf";
} else if (config_model.iframe_type === "neo") {
  config_model["url"] = "/static/source/model/Neo_v1.gltf";
} else if (config_model.iframe_type === "ekross") {
  if (
    config_model.fork_type == "santur" &&
    config_model.wheel_size == "size18"
  ) {
    config_model["url"] = "/static/source/model/ekros_saturn_18.gltf";
  } else if (
    config_model.fork_type == "santur" &&
    config_model.wheel_size == "size26"
  ) {
    config_model["url"] = "/static/source/model/ekros_saturn_26.gltf";
  } else if (
    config_model.fork_type == "zoom" &&
    config_model.wheel_size == "size18"
  ) {
    config_model["url"] = "/static/source/model/ekros_zum_18.gltf";
  } else if (
    config_model.fork_type == "zoom" &&
    config_model.wheel_size == "size26"
  ) {
    config_model["url"] = "/static/source/model/ekros_zum_26.gltf";
  } else if (
    config_model.fork_type == "dnm" &&
    config_model.wheel_size == "size18"
  ) {
    config_model["url"] = "/static/source/model/ekros_dmn_18.gltf";
  } else if (
    config_model.fork_type == "dnm" &&
    config_model.wheel_size == "size26"
  ) {
    config_model["url"] = "/static/source/model/ekros_dmn_26.gltf";
  }
} else if (config_model.iframe_type === "lite") {
  if (
    config_model.fork_type == "santur" &&
    config_model.wheel_size == "size20"
  ) {
    config_model["url"] = "/static/source/model/lite/lite_saturn_20.gltf";
  } else if (
    config_model.fork_type == "santur" &&
    config_model.wheel_size == "size26"
  ) {
    config_model["url"] = "/static/source/model/lite/lite_saturn_26.gltf";
  } else if (
    config_model.fork_type == "zoom" &&
    config_model.wheel_size == "size18"
  ) {
    config_model["url"] = "/static/source/model/lite/lite_zum_18.gltf";
  } else if (
    config_model.fork_type == "zoom" &&
    config_model.wheel_size == "size20"
  ) {
    config_model["url"] = "/static/source/model/lite/lite_zum_20.gltf";
  } else if (
    config_model.fork_type == "zoom" &&
    config_model.wheel_size == "size24"
  ) {
    config_model["url"] = "/static/source/model/lite/lite_zum_24.gltf";
  } else if (
    config_model.fork_type == "zoom" &&
    config_model.wheel_size == "size26"
  ) {
    config_model["url"] = "/static/source/model/lite/lite_zum_26.gltf";
  } else if (
    config_model.fork_type == "dnm" &&
    config_model.wheel_size == "size18"
  ) {
    config_model["url"] = "/static/source/model/lite/lite_dnm_18.gltf";
  } else if (
    config_model.fork_type == "dnm" &&
    config_model.wheel_size == "size20"
  ) {
    config_model["url"] = "/static/source/model/lite/lite_dnm_20.gltf";
  } else if (
    config_model.fork_type == "dnm" &&
    config_model.wheel_size == "size24"
  ) {
    config_model["url"] = "/static/source/model/lite/lite_dnm_24.gltf";
  } else if (
    config_model.fork_type == "dnm" &&
    config_model.wheel_size == "size26"
  ) {
    config_model["url"] = "/static/source/model/lite/lite_dnm_26.gltf";
  } else {
    config_model["url"] = "/static/source/model/lite/lite_dnmFat_26Fat.gltf";
  }
}

$(".views__back").on("click", function () {
  let back_url = createUrl(config_model);

  window.location.href = `/page1/?${back_url}`;
});

function createUrl(config_model) {
  let back_url = Object.keys(filterObject(config_model))
    .map((key) => {
      if (key.indexOf("_color") != -1) {
        return `${key}=${encodeURIComponent(`#${config_model[key]}`)}`;
      } else {
        return `${key}=${encodeURIComponent(config_model[key])}`;
      }
    })
    .join("&");
  return back_url;
}

$(".form__radio").on("click", function () {
 
  if (!$(this).hasClass("form__radio-hiden")) {
    let value = $(this).data("value");
 
    let parametr = $(this)
      .parents(".settings__box_main-radio")
      .children("input[type=hidden]")[0];

    let parametr_name = parametr.name;

    if (parametr_name.indexOf("_color") != -1) {
      config_model[parametr_name] = value.replace("#", "");
    } else {
      config_model[parametr_name] = value;
    }
    parametr.value = value;

    if (!!$(this).data("childrens")) {
      let children_element = $(this).data("childrens");
      console.log(children_element);
      childrensСonnections(children_element);
    }

    let tempObject = filterObject(config_model);

    chengePriseModel(tempObject);

    let back_url = createUrl(config_model);

    history.pushState(null, null, `/page2/?${back_url}`);
  }
});

$(".form_box__item").on("click", function () {
  if (!$(this).hasClass("form_box__item-hidden")) {
    $(this).toggleClass("form_box__item-active");
    let item_input = $(this).find("input");

    if (item_input.prop("checked") == true) {
      item_input.prop("checked", false);
      delete config_model[item_input[0].name];
    } else {
      item_input.prop("checked", true);
      config_model[item_input[0].name] = "true";
    }

    let tempObject = filterObject(config_model);

    chengePriseModel(tempObject);

    let back_url = createUrl(config_model);

    history.pushState(null, null, `/page2/?${back_url}`);
  }
});

/////||||///////
/////||||///////
/////||||///////
/////||||///////
//||/||||/||////
///||||||||/////
////||||||//////
/////||||///////
//////||////////
////////////////
// RENDER 3D
// RENDER 3D
// RENDER 3D
// RENDER 3D
// RENDER 3D

var container;
let rotateSpeed = 0;

let views__visual_right = false;
let views__visual_left = false;
var camera, scene, renderer, hemiLightHelper, dirLightHeper, theModel;

var mouseX = 0,
  mouseY = 0;
let views__visula_3d = document.getElementsByClassName("views__visula_3d")[0];

var windowHalfX = views__visula_3d.offsetWidth / 2;
var windowHalfY = window.innerHeight / 2;
const INITIAL_MTL = new THREE.MeshPhongMaterial({
  color: 0xb4b4b4,
  shininess: 10,
});

var object;

init();
animate();

function init() {
  container = document.createElement("div");

  document.getElementsByClassName("views__visula_3d")[0].appendChild(container);

  camera = new THREE.PerspectiveCamera(
    60,
    views__visula_3d.offsetWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.z = 170;
  camera.position.y = 80;

  scene = new THREE.Scene();
  scene.background = new THREE.Color("0xffffff");
  scene.fog = new THREE.Fog(0xb4b4b4, 100, 1200);

  var manager = new THREE.LoadingManager();
  manager.onStart = function (url, itemsLoaded, itemsTotal) {
    if ($(".visula__loading_wrap").length > 0) {
      $(".visula__loading_wrap").addClass("visula__loading_wrap-active");
    }
  };

  manager.onLoad = function () {
    if ($(".visula__loading_wrap").length > 0) {
      $(".visula__loading_wrap").removeClass("visula__loading_wrap-active");
    }
  };

  manager.onProgress = function (url, itemsLoaded, itemsTotal) {
    // console.log(
    //   "Loading file: " +
    //     url +
    //     ".\nLoaded " +
    //     itemsLoaded +
    //     " of " +
    //     itemsTotal +
    //     " files."
    // );
  };

  manager.onError = function (url) {
    // console.log("There was an error loading " + url);
  };

  // Init the object loader
  var loader = new GLTFLoader(manager);

  loader.load(
    config_model.url,
    function (gltf) {
      theModel = gltf.scene;
      let flag = 0;
      // Set the models initial scale
      theModel.scale.set(0.05, 0.05, 0.05);
      theModel.children[0].visible = false;

      let theModelColor = colorBike(theModel, config_model);

      scene.add(theModelColor);
    },
    onProgress,
    function (error) {
      console.error(error);
    }
  );

  function onProgress(xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = (xhr.loaded / xhr.total) * 100;
      if ($(".visula__loading-line").length > 0) {
        $(".visula__loading-line")[0].style.maxWidth =
          Math.round(percentComplete, 2) + "%";
      }
      if ($(".visula__loading-text").length > 0) {
        $(".visula__loading-text").text(Math.round(percentComplete, 1) + "%");
      }
    }
  }
  const cubeSize = 4;
  const cubeGeo = new THREE.BoxBufferGeometry(cubeSize, cubeSize, cubeSize);
  const cubeMat = new THREE.MeshPhongMaterial({ color: "#8AC" });
  const mesh12 = new THREE.Mesh(cubeGeo, cubeMat);
  mesh12.castShadow = true;
  // mesh12.receiveShadow = true;
  mesh12.position.set(0, 25, 0);
  // scene.add(mesh12);

  scene.add(addCircleToBacground(64.8, 65, 120));
  scene.add(addCircleToBacground(69.8, 70, 120));

  // // Add lights
  var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
  hemiLight.position.set(0, 50, 0);
  // Add hemisphere light to scene
  scene.add(hemiLight);

  //Create a DirectionalLight and turn on shadows for the light
  var light = new THREE.DirectionalLight(0xffffff, 1, 100);
  light.position.set(-100, 100, 100); //default; light shining from top
  light.intensity = 600; // default false
  light.castShadow = true; // default false
  scene.add(light);
  light.shadow.camera.top = 120;
  light.shadow.camera.bottom = -50;
  light.shadow.camera.left = -70;
  light.shadow.camera.right = 70;
  light.intensity = 1;

  //Set up shadow properties for the light
  light.shadow.mapSize.width = 1212; // default
  light.shadow.mapSize.height = 1212; // default
  light.shadow.camera.near = 0.5; // default
  light.shadow.camera.far = 700; // default

  // Floor
  var floorGeometry = new THREE.PlaneGeometry(9000, 9000, 1, 1);
  var floorMaterial = new THREE.MeshPhongMaterial({
    color: 0xf1f1f1,
    shininess: 0,
  });

  var floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -0.5 * Math.PI;
  floor.receiveShadow = true;
  floor.position.y = -1;
  scene.add(floor);

  renderer = new THREE.WebGLRenderer({ container, antialias: true });
  renderer.shadowMap.enabled = true;
  // renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(views__visula_3d.offsetWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  var controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 25, 0);

  controls.maxPolarAngle = Math.PI / 1.8;
  controls.minDistance = 50;
  controls.maxDistance = 400;
  controls.minPolarAngle = Math.PI / 6;
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.dampingFactor = 0.1;
  controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
  controls.autoRotateSpeed = 0.2;

  // // Щар що відкидає тінь
  // HelperSphereShadows(scene);

  // //   Площина яка невідеидає тінь
  // HelperPlaneShadows(scene,light);

  // Помічник показує камеру для того зоб бачити куди буде падати тінь
  // HelperShadowCamera(scene, light.shadow.camera);
  // HelperShadowCamera(scene, scene.shadow.camera);

  // // // Додає до сцени вісі кординат
  // HelperCordinates(scene, 40);

  window.addEventListener("resize", onWindowResize, false);

  //   var geometry123 = new THREE.RingGeometry( 1, 5, 32 );
  // var material123 = new THREE.MeshBasicMaterial( { color: 0x12ff00, side: THREE.DoubleSide } );
  // var mesh123 = new THREE.Mesh( geometry123, mesh123 );

  $(".views__order_go").on("click", function () {
    event.preventDefault();
    $(".views__parameter_wrap").addClass("views__parameter_wrap-active");
    $(".views__order").addClass("views__order-hidden");
    if ($(window).width() > 992) {
      $(".views__visual").addClass("views__visual-compress");

      setTimeout(function () {
        onWindowResize();
      }, 300);
    }
    // resizeRendererToDisplaySize();
  });

  $(".views__parameter_close").on("click", function () {
    $(".views__order").removeClass("views__order-hidden");
    $(".views__parameter_wrap").removeClass("views__parameter_wrap-active");
    $(".views__visual").removeClass("views__visual-compress");
    if ($(window).width() > 992) {
      setTimeout(function () {
        onWindowResize();
      }, 300);
    }
  });
  $(".views__parameter_back").on("click", function () {
    $(".views__order").removeClass("views__order-hidden");
    $(".views__parameter_wrap").removeClass("views__parameter_wrap-active");
    $(".views__visual").removeClass("views__visual-compress");
    if ($(window).width() > 992) {
      setTimeout(function () {
        onWindowResize();
      }, 300);
    }
  });

  // scene.add( mesh123 );
}

function onWindowResize() {
  windowHalfX = views__visula_3d.offsetWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = views__visula_3d.offsetWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(views__visula_3d.offsetWidth, window.innerHeight);
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  var width = views__visula_3d.offsetWidth;
  var height = window.innerHeight;
  var canvasPixelWidth = canvas.width / window.devicePixelRatio;
  var canvasPixelHeight = canvas.height / window.devicePixelRatio;

  // canvas.css({transition:'.3s'})

  const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function animate() {
  requestAnimationFrame(animate);
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;

    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  if (views__visual_left) {
    theModel.children[2].rotation.z += Math.PI / 180;
  }

  if (views__visual_right) {
    theModel.children[2].rotation.z -= Math.PI / 180;
  }

  renderer.render(scene, camera);
}

$(".views__visual_left")[0].addEventListener(
  "mousedown",
  () => (views__visual_left = true),
  false
);
$(".views__visual_right")[0].addEventListener(
  "mousedown",
  () => (views__visual_right = true),
  false
);

$(".views__visual_left")[0].addEventListener(
  "mouseup",
  () => (views__visual_left = false),
  false
);

$(".views__visual_right")[0].addEventListener(
  "mouseup",
  () => (views__visual_right = false),
  false
);

// touch event

$(".views__visual_left")[0].addEventListener(
  "touchstart",
  () => (views__visual_left = true),
  false
);
$(".views__visual_right")[0].addEventListener(
  "touchstart",
  () => (views__visual_right = true),
  false
);

$(".views__visual_left")[0].addEventListener(
  "touchend",
  () => (views__visual_left = false),
  false
);

$(".views__visual_right")[0].addEventListener(
  "touchend",
  () => (views__visual_right = false),
  false
);

window.addEventListener("touchend", function (event) {
  views__visual_left = false;
  views__visual_right = false;
});

$(".form_box__item").on("click", function () {
  if ($(this).find('input[type="checkbox"]')[0].name === "mirrors") {
    let valueChecked = $(this).find('input[type="checkbox"]')[0].checked;

    theModel.children[2].children.map((item) => {
      // багажник
      if (
        item.material.name.indexOf("Mirror_1") !== -1 ||
        item.material.name.indexOf("Mirror_2") !== -1
      ) {
        item.visible = valueChecked;
      }
    });
  } else if ($(this).find('input[type="checkbox"]')[0].name === "mud") {
    let valueChecked = $(this).find('input[type="checkbox"]')[0].checked;

    theModel.children[2].children.map((item) => {
      // багажник
      if (item.material.name.indexOf("Mud") !== -1) {
        item.visible = valueChecked;
      }
    });
  } else if ($(this).find('input[type="checkbox"]')[0].name === "trunk") {
    let valueChecked = $(this).find('input[type="checkbox"]')[0].checked;

    theModel.children[2].children.map((item) => {
      // багажник
      if (item.material.name.indexOf("Bag") !== -1) {
        item.visible = valueChecked;
      }
    });
  } else if ($(this).find('input[type="checkbox"]')[0].name === "seatKind") {
    let valueChecked = $(this).find('input[type="checkbox"]')[0].checked;

    theModel.children[2].children.map((item) => {
      // багажник
      if (
        item.material.name.indexOf("Seat_kind_1") !== -1 ||
        item.material.name.indexOf("Seat_kind_2") !== -1
      ) {
        item.visible = valueChecked;
      }
    });
  } else if ($(this).find('input[type="checkbox"]')[0].name === "battery") {
    let valueChecked = $(this).find('input[type="checkbox"]')[0].checked;

    theModel.children[2].children.map((item) => {
      // багажник
      if (item.material.name.indexOf("Bat") !== -1) {
        item.visible = valueChecked;
      }
    });
  }
});

$(".order_constructor").on("click", function () {
  event.preventDefault();
  $.fancybox.open({
    src: "#order__form_constructor",
    touch: false,
    afterShow: function () {
      let params_order = filterObject(config_model);
      Object.keys(params_order).map((item, key) => {

     


        $(".fancybox-content").append(creteInputHiden(item, params_order[item]));
      });
    },
    beforeClose: function () {
      $(".fancybox-content").find("input[type=hidden]").remove();
    },
  });
});
