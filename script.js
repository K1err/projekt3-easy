const url = "https://tinkr.tech/sdb/poly/wander"

document.getElementById('Saada')
addEventListener("click", function(){

});



async function talk(talk) {
    const messageData = {talk };
        
     const response = await fetch('https://tinkr.tech/sdb/poly/wander', {
        method: 'POST',
         headers: {
         'Content-Type': 'application/json'
         },
         body: JSON.stringify(messageData)
        });
        
     const result = await response.json();
    console.log(result);
    }

