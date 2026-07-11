let itemCount = 0;

function addItem(){
  itemCount++;
  const id = itemCount;
  const container = document.getElementById('itemsContainer');
  const emptyMsg = document.getElementById('emptyMsg');
  if(emptyMsg) emptyMsg.remove();

  const div = document.createElement('div');
  div.className = 'item-card';
  div.id = 'item-' + id;
  div.innerHTML = `
    <div class="item-head">
      <span class="item-num">${id}</span>
      <button class="remove-item" onclick="removeItem(${id})">سڕینەوە ✕</button>
    </div>
    <input type="text" placeholder="ناوی کاڵا" id="name-${id}">
    <div class="row2">
      <div class="field">
        <input type="number" placeholder="ژمارە" id="qty-${id}" value="1" oninput="calculateTotal()">
      </div>
      <div class="field">
        <input type="number" placeholder="نرخی یەک دانە (IQD)" id="price-${id}" oninput="calculateTotal()">
      </div>
    </div>
    <div class="item-total">
      <span>کۆی ئەم کاڵایە</span>
      <b id="itemTotal-${id}">IQD 0</b>
    </div>
  `;
  container.appendChild(div);
}

function removeItem(id){
  const el = document.getElementById('item-' + id);
  if(el) el.remove();
  const container = document.getElementById('itemsContainer');
  if(container.children.length === 0){
    container.innerHTML = `
      <div class="empty-msg" id="emptyMsg">
        <span class="empty-icon">🧾</span>
        <p>هیچ کاڵایەک زیاد نەکراوە</p>
      </div>`;
  }
  calculateTotal();
}

function calculateTotal(){
  let subtotal = 0;
  document.querySelectorAll('.item-card').forEach(card => {
    const id = card.id.split('-')[1];
    const qty = parseFloat(document.getElementById('qty-' + id).value) || 0;
    const price = parseFloat(document.getElementById('price-' + id).value) || 0;
    const lineTotal = qty * price;
    document.getElementById('itemTotal-' + id).textContent = 'IQD ' + lineTotal.toLocaleString();
    subtotal += lineTotal;
  });

  const discount = parseFloat(document.getElementById('discount').value) || 0;
  let total = subtotal - discount;
  if(total < 0) total = 0;

  document.getElementById('grandTotal').textContent = 'IQD ' + total.toLocaleString();
}

function resetForm(){
  if(!confirm('دڵنیایت لە گەڕانەوە بۆ دۆخی سەرەتایی؟ هەموو زانیارییەکان دەسڕدرێنەوە.')) return;
  document.getElementById('phone').value = '';
  document.getElementById('customer').value = '';
  document.getElementById('notes').value = '';
  document.getElementById('date').value = '';
  document.getElementById('receiptNo').value = '';
  document.getElementById('discount').value = '';
  document.getElementById('itemsContainer').innerHTML = `
    <div class="empty-msg" id="emptyMsg">
      <span class="empty-icon">🧾</span>
      <p>هیچ کاڵایەک زیاد نەکراوە</p>
    </div>`;
  itemCount = 0;
  calculateTotal();
}

function shareReceipt(){
  const customer = document.getElementById('customer').value || 'بەکارهێنەر';
  const total = document.getElementById('grandTotal').textContent;
  let text = `وەسڵی نوێ بۆ: ${customer}\nکۆی گشتی: ${total}`;
  if(navigator.share){
    navigator.share({title:'وەسڵ', text:text}).catch(()=>{});
  } else {
    alert('ئەم وێبگەڕە پشتگیری هاوبەشکردنی ڕاستەوخۆ ناکات.\n\n' + text);
  }
}

(function setDefaultDate(){
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  document.getElementById('date').value = `${y}/${m}/${day}`;
})();
