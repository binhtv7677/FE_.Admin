export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_NOTIFI_ID":
      state.device_id = action.device_id;
      return state;
    default:
      return state;
  }
};

function addProduct(arr, product) {
  var check = true;
  if (arr.length > 0) {
    arr.map(item => {
      if (item.id === product.id) {
        item.amount += 1;
        check = false;
      }
    });
  }
  if (check) {
    arr.push(product);
  }
  return arr;
}

function filterProduct(arr, id) {
  return arr.filter(function (ele) {
    return ele.id != id;
  });
}
