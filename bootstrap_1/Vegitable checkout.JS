const prices = {
    Broccoli: 2.5,
    Cabbage: 1.8,
    Potatoes: 3.0,
    Peppers: 2.2,
    Onions: 1.5,
    Cucumbers: 1.3,
    Sweetcorn: 2.0,
    Carrots: 1.6
  };
  
  const qualityMultipliers = {
    standard: 1,
    organic: 1.5,
    septic: 0.6
  };
  
  let selectedItem = "";
  const cartItems = [];
  
  function selectItem(itemName) {
    selectedItem = itemName;
    document.getElementById("selectedItemName").textContent = itemName;
    document.getElementById("qualityMenu").style.display = "block";
    document.getElementById("poundsInput").value = 1;
  }
  
  function addToCartWithQuality() {
    const quality = document.getElementById("qualitySelect").value;
    const pounds = parseFloat(document.getElementById("poundsInput").value);
  
    if (isNaN(pounds) || pounds <= 0) {
      alert("Please enter a valid number of pounds.");
      return;
    }
  
    const basePrice = prices[selectedItem];
    const multiplier = qualityMultipliers[quality];
    const finalPrice = basePrice * multiplier * pounds;
  
    cartItems.push({
      name: `${selectedItem} (${quality}, ${pounds} lb${pounds !== 1 ? "s" : ""})`,
      price: finalPrice
    });
  
    renderCart();
    document.getElementById("qualityMenu").style.display = "none";
  }
  
  function renderCart() {
    const list = document.getElementById("cart-items");
    const totalSpan = document.getElementById("total");
    list.innerHTML = "";
    let total = 0;
  
    cartItems.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      list.appendChild(li);
      total += item.price;
    });
  
    totalSpan.textContent = total.toFixed(2);
  }
  
  function checkout() {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
  
    document.querySelector(".cart").style.display = "none";
    document.getElementById("paymentScreen").style.display = "block";
  }
  
  function processPayment(event) {
    event.preventDefault();
    alert("Payment successful! Thank you for your purchase.");
  
    // Reset cart and return to cart view
    cartItems.length = 0;
    renderCart();
  
    document.getElementById("paymentScreen").style.display = "none";
    document.querySelector(".cart").style.display = "inline-block";
    return false;
  }
  
  renderCart();
  