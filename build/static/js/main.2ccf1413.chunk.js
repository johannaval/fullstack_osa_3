(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,n,t){},16:function(e,n,t){e.exports=t(39)},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(15),c=t.n(o),u=t(4),i=t(2),l=function(e){return r.a.createElement("li",null,e.person.name," "," ",e.person.number,r.a.createElement("button",{onClick:function(){e.deletePerson(e.person.id)}},"delete"))},m=function(e){return e.list},d=function(e){return null===e.notification?r.a.createElement("div",null):"error"===e.type?r.a.createElement("div",{className:"error"},r.a.createElement("p",null,e.notification)):r.a.createElement("div",{className:"positive"},r.a.createElement("p",null,e.notification))},f=function(e){return r.a.createElement("div",null,"filter shown with: ",r.a.createElement("input",{value:e.newFilter,onChange:e.handleFilterChange}))},s=function(e){return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:e.addPerson},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:e.newName,onChange:e.handleNameChange})," "),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberChange})," "),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},h=t(3),b=t.n(h),p="https://serene-citadel-52791.herokuapp.com/api/persons",v=function(){return b.a.get(p).then((function(e){return e.data}))},E=function(e){return b.a.post(p,e)},w=function(e,n){return b.a.put("".concat(p,"/").concat(e),n)},g=function(e){return b.a.delete("".concat(p,"/").concat(e))},j=(t(14),function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],o=n[1],c=Object(a.useState)(""),h=Object(i.a)(c,2),b=h[0],p=h[1],j=Object(a.useState)(""),O=Object(i.a)(j,2),C=O[0],N=O[1],y=Object(a.useState)(""),k=Object(i.a)(y,2),S=k[0],P=k[1],B=Object(a.useState)(null),F=Object(i.a)(B,2),D=F[0],I=F[1],J=Object(a.useState)(null),L=Object(i.a)(J,2),T=L[0],x=L[1];Object(a.useEffect)((function(){v().then((function(e){o(e)}))}),[]);var A=function(e){var n=t.find((function(n){return n.name===e.name})),a=n.id,r=e.number,c=Object(u.a)(Object(u.a)({},n),{},{number:r});w(n.id,c).then((function(e){o(t.map((function(e){return e.id!==a?e:c}))),I("Changed the phone number of ".concat(n.name)),z()})).catch((function(e){x("Information of ".concat(n.name," has already been removed from the server")),G()}))},q=function(e){var n=t.find((function(n){return n.id===e}));new Boolean(!1);window.confirm("Delete ".concat(n.name," ?"))&&(g(e).then((function(n){!function(e){var n=t.filter((function(n){return n.id!==e}));o(n)}(e)})),I("Deleted ".concat(n.name)),z())},z=function(){setTimeout((function(){I(null)}),3e3)},G=function(){setTimeout((function(){x(null)}),3e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(d,{notification:D,type:"positive"}),r.a.createElement(d,{notification:T,type:"error"}),r.a.createElement(f,{newFilter:S,handleFilterChange:function(e){P(e.target.value)}}),r.a.createElement(s,{addPerson:function(e){e.preventDefault();var n={name:b,number:C},a=new Boolean(!0);if(void 0!==t.find((function(e){return e.name===n.name}))&&(a=!1),a)o(t.concat(n)),E(n).then((function(e){o(t.concat(e.data))})),I("Added ".concat(n.name)),z();else{new Boolean(!1);window.confirm("".concat(n.name," is already added to phonebook, replace the old number with a new one?"))&&A(n)}p(""),N("")},newName:b,handleNameChange:function(e){p(e.target.value)},newNumber:C,handleNumberChange:function(e){N(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(m,{list:(null===S?t:t.filter((function(e){return null===e||void 0===e?void 0:e.name.toLowerCase().includes(S.toLowerCase())}))).map((function(e){return r.a.createElement(l,{key:e.id,id:e.id,person:e,deletePerson:q})}))}))});c.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.2ccf1413.chunk.js.map