export function openModal() {

    const modal = document.getElementById('modal');
  
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  
  }
  
  export function closeModal() {
  
    const modal = document.getElementById('modal');
  
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  
  }