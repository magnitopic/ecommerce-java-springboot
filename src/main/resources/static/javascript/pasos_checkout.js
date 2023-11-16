let checkout_paso_zero = () => {
	// mostrar al user un form donde mostrar la info del envÃ­o
	$("#contenedor").html(plantillaCheckoutUno);
	$("#aceptar_paso_1").click(check_out_uno);
};

let check_out_uno = () => {
	// recoger los valores introducidos y enviarlos al servidor
	let nombre = $("#nombre").val();
	let direccion = $("#direccion").val();
	let provincia = $("#provincia").val();
	$.post("servicioWebPedidos/paso1", {
		nombre: nombre,
		direccion: direccion,
		provincia: provincia,
	}).done((res) => {
		if (res == "ok") {
			$("#contenedor").html(plantillaCheckoutDos);
			$("#aceptar_paso_2").click(checkout_paso_dos);
		} else {
			alert(res);
		}
	});
};

let checkout_paso_dos = () =>{
	let tipo_tarjeta = $("#tipo_tarjeta").find(":selected").val();
	let numero_tarjeta = $("#numero_tarjeta").val();
	let titular_tarjeta = $("#titular_tarjeta").val();
	$.post("servicioWebPedidos/paso2",{
		tarjeta: tipo_tarjeta,
		numero: numero_tarjeta,
		titular: titular_tarjeta
	}).done((res) => {
		if (res == "ok"){
			$("#contenedor").html(plantillaCheckoutTres);
			$("#aceptar_paso_3").click(checkout_paso_tres);
		}else{
			alert(res);
		}
	})
}

let checkout_paso_tres = () => {
		let regalo = $("#regalo").is(":checked");
		let observaciones = $("#observaciones").val();
		$.post("servicioWebPedidos/paso3",{
			regalo:regalo,
			observaciones: observaciones
		}).done((res)=>{
			console.log(JSON.parse(res));
			let resumen_pedido = JSON.parse(res);
			let html = Mustache.render(plantillaCheckoutFinal, resumen_pedido);
			$("#contenedor").html(html);
			$("#boton_confirmar_pedido").click(()=>{
				$.ajax("servicioWebPedidos/FinalPedido",{
					success: (res)=>{
						alert("repuesta del servicio web: " + res);
						mostrar_discos();
					}
				});
			});
		});
}



