localStorage.mode = localStorage.mode || 'white';
document.getElementById('mode').setAttribute('class', 'fas fa-' + (localStorage.mode === 'black' ? 'sun' : 'moon'));
function mode(m) {
	const text = (m === 'dark' || m === 'black') ? 'white' : 'black';
	const bgcolor = (m === 'dark' || m === 'black') ? 'black' : 'white';
	document.getElementsByTagName('body')[0].style.backgroundColor = bgcolor;
	document.getElementsByTagName('input')[0].style.borderColor = bgcolor === 'black' ? '#0D6EFD' : '';
	document.getElementsByTagName('input')[0].style.backgroundColor = bgcolor;
	document.getElementsByTagName('input')[0].style.color = text;
	document.getElementsByTagName('img')[0].style.filter = bgcolor === 'black' ? 'invert(90%)' : '';
	if (document.getElementsByClassName('card').length) {
		document.getElementsByClassName('card')[0].style.backgroundColor = bgcolor;
		document.getElementsByClassName('card')[0].style.borderColor = bgcolor === 'black' ? '#0D6EFD' : '';
		document.getElementsByTagName('p')[0].style.color = text;
	}
	localStorage.mode = bgcolor;
	document.getElementById('mode').setAttribute('class', 'fas fa-' + (localStorage.mode === 'black' ? 'sun' : 'moon'));
	document.getElementById('mode').style.color = (localStorage.mode === 'white' ? 'black' : 'white');
	document.getElementsByClassName('modal')[0].style.backgroundColor = localStorage.mode === 'black' ? 'rgba(0, 0, 0, .8)' : 'rgba( 255, 255, 255, .8 )'
}
document.getElementById('wrapMode').onclick = () => {
	mode(localStorage.mode === 'black' ? 'white' : 'dark');
}
mode(localStorage.mode)
document.getElementById('submitter').onclick = function() {
	$('body').addClass("loading");
	fetch('info?' + (new URLSearchParams({ url: document.getElementById('tiktokurl').value })), {
		method: 'GET'
	}).then(async function(response) {
		const data = await response.json();
		fetch('ttdownloader?' + (new URLSearchParams({ url: document.getElementById('tiktokurl').value })), {
			method: 'GET'
		}).then(async (resp) => {
			const dj = await resp.json()
			console.log(dj.slice(1));
			$(".emptydiv").empty().append(`
              <div class="row justify-content-center" id="downgrup" style="padding-bottom: 100px;">
                <div class="card" style="width: 20 rem;background-color:${localStorage.mode === 'black' ? 'black; border-color: #0D6EFD' : 'white'}">
                  <video class="card-img-top" alt="..." poster="${data.cover}" style="padding-top:7px;" controls>
                    <source src="${dj[0].url}" type="video/mp4">
                  </video>
									<a href="${dj[0].url}" class="btn btn-primary" target="_blank">Download</a>
                </div>
            </div>
          `)
			$("body").removeClass("loading");
		})
	}).catch(function(err) {
		$("body").removeClass("loading");
	})
}
