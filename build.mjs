import {writeFile} from 'node:fs/promises';
const groups=[
{id:'pizzas-tomate',category:'pizzas',name:'Pizzas · Base tomate',note:'Deux tailles : Moyenne / Méga',columns:['Moyenne','Méga'],items:[
['Marguerite','Sauce tomate, mozzarella.',10,14],['La Reine','Sauce tomate, mozzarella, jambon, champignons.',12,16],['Les 4 fromages','Sauce tomate, mozzarella, bleu, brie, chèvre.',12,16],['La Végétarienne','Sauce tomate, mozzarella, tomate fraîche, oignon, champignon, poivron, aubergine.',12,16],['La Neptune','Sauce tomate, mozzarella, thon, oignons, poivrons, olives.',12,16],['La Chorizo','Sauce tomate, mozzarella, chèvre, champignons, olives.',12,16],['Pizza Pepperoni','Sauce tomate, mozzarella, pepperoni.',12,16]
]},
{id:'pizzas-creme',category:'pizzas',name:'Pizzas · Base crème',note:'Deux tailles : Moyenne / Méga',columns:['Moyenne','Méga'],items:[
['Normande','Crème fraîche, mozzarella, poulet, champignons, camembert.',12,16],['La Boisée','Crème fraîche, mozzarella, poulet, poivron, sauce gruyère.',12,16],['La Chicken','Crème fraîche, mozzarella, poulet, pomme de terre.',12,16],['La Norvégienne','Crème fraîche, mozzarella, saumon fumé.',12,16],['La Savoyarde','Crème fraîche, mozzarella, lardons, pomme de terre, reblochon.',12,16],['La Raclette','Crème fraîche, mozzarella, lardons, jambon de dinde, raclette.',12,16],['La Paysanne','Crème fraîche, mozzarella, jambon, champignon, pomme de terre, oignons.',12,16],['La Fermière','Crème fraîche, mozzarella, jambon, lardons, Boursin.',12,16],['La Truffe','Crème de truffe, mozzarella, champignons, parmesan, huile d’olive, roquette, stracciatella, amandes grillées.',14,18],['Mortadelle pistache','Crème fraîche, mozzarella, burrata, roquette, mortadelle, pistache. Composition détaillée à confirmer.',14,18],['Chèvre figue miel','Crème fraîche, mozzarella, confiture de figue, chèvre, miel.',12,16]
]},
{id:'burgers',category:'burgers',name:'Les burgers',note:'Prix du burger seul, selon la carte fournie',columns:['Prix'],items:[
['Cheeseburger','Salade, tomate, oignons, cheddar. Steak, chicken pané ou galette végé au choix.',4.5],['Le Chèvre miel','Steak, chèvre, miel, salade, tomate, oignons.',6.5],['Le Royal','Steak, œuf, cheddar, jambon de dinde, salade, tomate, oignons.',6.5],['Le Megabun','Double steak, cheddar, salade, tomate, oignons.',5.5],['Le Bap’s','Galette de pommes de terre, steak, cheddar, salade, tomate, oignons.',5.5],['Le Montagnard','Steak, raclette, salade, tomate, oignons, chorizo.',6.5],['Le Globe','Steak, chicken pané, cheddar, salade, tomate, oignons.',6.5]
]},
{id:'sandwichs',category:'sandwichs',name:'Sandwichs & galettes',note:'Viandes et sauces au choix, selon disponibilité',columns:['Prix'],items:[
['Le Simple','Viande au choix, salade, tomate, oignons.',5.5],['L’Américain','Viande hachée, salade, tomate, oignons, cheddar.',5.5],['Le Spécial','Viande hachée, œuf, raclette, salade, tomate, oignons.',7.5],['Le Marine','Poulet mariné, salade, tomate, oignons, cheddar.',7],['Le Double','Deux viandes, salade, tomate, oignons, cheddar.',7]
]},
{id:'tacos',category:'tacos',name:'Composez votre tacos',note:'Viande au choix · Supplément viande : + 1,50 € · Fromage : + 1 €',columns:['Prix'],items:[
['Mini','Le petit format.',4.5],['Simple','Viande au choix, sauce à préciser.',6],['Maxi','Le grand format.',7.5]
]},
{id:'tacos-signatures',category:'tacos',name:'Les originaux',note:'Tacos spéciaux · Gratinage Simple + 2 € / Maxi + 3 €',columns:['Prix'],items:[
['Savoyard','Lardons, pomme de terre, sauce fromagère.',7.5],['Raclette','Viande kebab, fromage à raclette, sauce fromagère.',7.5],['Chèvre miel','Poulet, fromage de chèvre, miel, sauce fromagère.',7.5],['Végé','Salade, tomates, olives, oignons, sauce au choix. Recette à préciser.',7.5],['Complet','Viande hachée, sauce fromagère, emmental.',7.5],['Mexicain','Poulet pané, poivrons.',7.5]
]},
{id:'panuzzi',category:'panuzzi',name:'Les panuzzi',note:'Une autre façon de faire votre pause',columns:['Prix'],items:[
['Vegan','Huile d’olive, roquette, tomates, poivrons, aubergines, basilic.',8],['Americano','Huile d’olive, oignons caramélisés, jambon, jambon de dinde, chorizo, jambon de veau, roquette.',10],['Saumon','Crème fraîche, saumon fumé, roquette, oignon.',8],['Thon','Crème fraîche, huile d’olive, thon, tomates, confit d’oignon, roquette.',8]
]},
{id:'bowls',category:'bowls',name:'Les bowls O’32',note:'Frites et sauce, version généreuse',columns:['Prix'],items:[
['Le Chicken','Frites, poulet frit, oignons frits, sauce au choix.',8.5],['Le Classic','Frites, sauce fromagère, viande au choix, oignons frits, sauce au choix.',7.5],['Le Végé','Frites, falafels, oignons frits, sauce fromagère, fromage comté.',8.5]
]},
{id:'assiettes',category:'assiettes',name:'Les assiettes',note:'Viandes au choix, salade, tomates, oignons',columns:['Prix'],items:[
['Simple','Une viande au choix.',10],['Double','Deux viandes au choix.',12],['Triple','Trois viandes au choix.',14]
]},
{id:'texmex',category:'texmex',name:'Les Tex-Mex',note:'Portions de 3, 6 ou 10 pièces',columns:['3 pièces','6 pièces','10 pièces'],items:[
['Nuggets','À partager… ou pas.',3.5,6,9],['Onion rings','Rondelles d’oignons panées.',3.5,6,9],['Mozzarella','Bouchées de mozzarella.',3.5,5.5,8.5],['Camembert','Bouchées au camembert.',3.5,5.5,8.5],['Tenders','Poulet pané.',3,6,9],['Jalapeños','Bouchées de jalapeños.',3,6,9]
]},
{id:'frites',category:'acotes',name:'Les frites',note:'Pour compléter votre repas',columns:['Prix'],items:[
['La petite','Portion de frites.',2],['La grande','Grande portion de frites.',3],['Cheddar','Supplément cheddar sur les frites.',1.5]
]},
{id:'boissons-desserts',category:'acotes',name:'Boissons & desserts',note:'Parfums et références à confirmer à la commande',columns:['Prix'],items:[
['Boisson · 33 cl','Selon sélection du restaurant.',1.5],['Boisson · 50 cl','Selon sélection du restaurant.',2],['Boisson · 1,5 L','À partager.',3],['Boisson · 2 L','À partager.',3.5],['Tiramisu','Dessert.',3],['Tarte au Daim ou au Milka','Dessert.',3],['Café','Boisson chaude.',1.5]
]}];
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const euro=n=>n.toLocaleString('fr-FR',{style:'currency',currency:'EUR'});
const cards=groups.map((g,i)=>`<section class="menu-group ${g.columns.length===3?'three-prices':''}" data-group data-category="${g.category}"><div class="group-heading"><span class="group-number">${String(i+1).padStart(2,'0')}</span><div><h3>${g.name}</h3><p>${g.note}</p></div></div><div class="price-head" style="--prices:${g.columns.length}"><span></span>${g.columns.map(c=>`<span>${c}</span>`).join('')}</div>${g.items.map(([name,description,...prices])=>`<article class="menu-item" data-search="${escape(g.name+' '+name+' '+description)}" style="--prices:${prices.length}"><div><h4>${name}</h4><p>${description}</p></div>${prices.map((price,j)=>`<span class="item-price"><small>${g.columns[j]}</small>${euro(price)}</span>`).join('')}</article>`).join('')}</section>`).join('');
const template=await import('node:fs/promises').then(fs=>fs.readFile('src.html','utf8'));await writeFile('dist/index.html',template.replace('{{MENU}}',cards));console.log(`${groups.length} rubriques, ${groups.reduce((a,g)=>a+g.items.length,0)} produits : page O’32 générée.`);
