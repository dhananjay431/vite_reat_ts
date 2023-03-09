import { useEffect, useState } from "react";
import "./assets/bootstrap.min.css";
declare var $: any;

function xmltojson(resp: any, key: any) {
  return $.cordys.json.find(resp, key);
}
function ajax(method: any, namespace: any, parameters: any) {
  return new Promise((rev, rej) => {
    $.cordys.ajax({
      method: method,
      namespace: namespace,
      dataType: "* json",
      parameters: parameters,
      success: function success(resp: any) {
        rev(resp);
        //let test = $.cordys.json.find(resp, 'ScreenAccess');
      },
      error: function error(e1: any, e2: any, e3: any) {
        console.log("err=>", e1, e2, e3);
        rev([e1, e2, e3]);
      },
    });
  });
}
//
export default {
  ajax,
  xmltojson,
};
