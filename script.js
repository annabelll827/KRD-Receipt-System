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
    <button class="remove-item" onclick="removeItem(${id})">سڕینەوە ✕</button>
    <div style="clear:both;"></div>
    <input type="text" placeholder="ناوی کاڵا" id="name-${id}" style="margin-bottom:8px;">
    <div class="row2">
      <input type="number" placeholder="ژمارە" id="qty-${id}" value="1" oninput="calculateTotal()">
      <input type="number" placeholder="نرخی یەک دانە (IQD)" id="price-${id}" oninput="calculateTotal()">
    </div>
    <div class="item-total" id="itemTotal-${id}">کۆ: IQD 0</div>
  `;
  container.appendChild(div);
}

function removeItem(id){
  const el = document.getElementById('item-' + id);
  if(el) el.remove();
  const container = document.getElementById('itemsContainer');
  if(container.children.length === 0){
    container.innerHTML = '<p class="empty-msg" id="emptyMsg">هیچ کاڵایەک زیاد نەکراوە</p>';
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
    document.getElementById('itemTotal-' + id).textContent = 'کۆ: IQD ' + lineTotal.toLocaleString();
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
  document.getElementById('itemsContainer').innerHTML = '<p class="empty-msg" id="emptyMsg">هیچ کاڵایەک زیاد نەکراوە</p>';
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

// set today's date by default
(function setDefaultDate(){
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  document.getElementById('date').value = `${y}/${m}/${day}`;
})();
