import { argv } from "process";

const matchRes = argv.find((arg) => /^products/.test(arg));
const matchId = argv.find((arg) => /^products\/\d+$/.test(arg));

const resource =  argv[3].split("/")[0];

const recurso = matchRes ? matchRes.split("/")[0] : null;
const id = matchId ? matchId.split("/")[1] : null;


if (argv.length < 4) {
  throw new Error("Faltan argumentos");
}

const [, , metodo, , title, price, category, ...params] = argv;



// console.log(params);
// console.log(metodo);
// console.log(recurso);
// console.log(id);

// console.log("---------");

// console.log(argv[4]);
// console.log(argv[5]);
// console.log(argv[6]);
// console.log("---------");

// console.log(title);
// console.log(price);
// console.log(category);


const baseUrl = "https://fakestoreapi.com/";

if (recurso)
{
    switch (metodo.toUpperCase()) 
    {
        //GET con o sin Id 
        case 'GET':
            {
                const url = id ? `${baseUrl}/${recurso}/${id}` : `${baseUrl}/${recurso}`;
                const res = await fetch(url);
                const data = await res.json();
                console.log(data);
                console.log(url);
                break
            }
       case 'DELETE':
            {
                if (id) 
                    {
                        const url = `${baseUrl}/${recurso}/${id}`;
                        const res = await fetch(url,{
                            method: 'DELETE'
                        });
                        const data = await res.json();
                        console.log(data);
                        console.log(url);

                        console.log(`Id: ${id} borrado...`);
                        break
                    }
                console.log(`Metodo DELETE necesita ID...`)
                break
            }
        case 'POST':    //suponemos que agregamos solo: title,price,category
            {
                if (title && price && category) 
                    {
                        const producto = {title: title, price: price, category: category};
                        const url = `${baseUrl}/${recurso}`;
                        const res = await fetch(url,{
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(producto)
                        });
                        const data = await res.json();
                        console.log(data);
                        console.log(url);

                        console.log(`Artículo agregado...`);
                        break
                    }
                console.log(`Metodo POST necesita los argumentos de título, precio y categoría...`)
                break

            }
        default: console.log("Metodo desconocido...")
    }
    
}
else console.log("Recurso desconocido...")

