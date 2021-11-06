// for my tracks

function deleteTrack(data) {
	axios.delete("/mytracks?q=" + data.trackId).then((res)=>{
		console.log(res);
		if(res.data){
			messager({
				replace: ["danger", "success"],
				message: "Deleted"
			});
			data.e.parentElement.parentElement.parentElement.parentElement.style.display = "none"
		}
		else{
			messager({
				replace: ["success", "danger"],
				message: "Failed to delete"
			});
		}
	}).catch((err)=>{
		console.error(err);
		messager({
			replace: ["success", "danger"],
			message: "Bad Network Connection"
		});
	});
}