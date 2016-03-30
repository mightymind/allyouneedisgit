var storage = chrome.storage.local;

function i18n() {
	var els = $('[data-i18n-id]');
	if(els.size()) {
		els.each(function(index){
			var el = $(this);
			var i18n_id = el.attr('data-i18n-id');
			el.html(chrome.i18n.getMessage(i18n_id));
			el.val(chrome.i18n.getMessage(i18n_id));
		})
	}
}

function saveRepoList(event) {
	event.preventDefault();
	
	var f = $(this);
	var ta = f.find('textarea[name="repolist"]');
	var list = ta.val().split("\n");
	var _list = {};
	for(var i = 0; i < list.length; i++) {
		var id = list[i].trim();
		var url_arr = id.split('/');
		var url = 'https://api.github.com/repos/' + url_arr[3] + '/' + url_arr[4] + '/commits';
		
		_list[id] = {
			id : id,
			url : url,
			user : url_arr[3],
			repo : url_arr[4],
			last_commit : {},
		};
	}
	storage.set({'repolist' : _list}, function(){
		$('.save-notify').html(chrome.i18n.getMessage('ui_save_notify')).addClass('active');
		setTimeout(function(){
			$('.save-notify').html('').removeClass('active');
		},3000);
	});
}

var updateLinkHref = function () {
	/*
	var links = document.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		(function () {
			var ln = links[i];
			var location = ln.href;
			ln.onclick = function () {
				chrome.tabs.create({active: true, url: location});
			};
		})();
	}
	*/
	$('a').each(function(index){
		
		var btn = $(this);
		if(!btn.parent().hasClass('menu-item')) {
			var location = btn.attr('href');
			btn.unbind('click.fecss');
			btn.on('click.fecss', function(event){
				event.preventDefault();
				
				chrome.tabs.create({active: true, url: location});
			})
		}
		
	});
}

document.addEventListener('DOMContentLoaded', updateLinkHref);

function loadRepoList() {
	//event.preventDefault();
	
	var f = $('form');
	var ta = f.find('textarea[name="repolist"]');
	
	//$('form input[type="submit"]').val(chrome.i18n.getMessage('ui_save_btn'));
	
	i18n();
	
	storage.get(null, function(list) {
		//ta.val(JSON.stringify(list.repolist));
		
		$('.last_commit_list').empty();//.hide();
		
		if(typeof list.repolist == 'object') {
			
			var _arr = [];
			var _i = 0;
			
			for(var k in list.repolist) {
				
				var repo = list.repolist[k];
				var id = repo.id;
				_arr.push(id);
				
				if(repo.last_commit.sha) {
					if(typeof repo.last_commit.sha == 'string') {
						
						_i++;
						
						var lc = repo.last_commit;
						var lu = new Date(repo.last_update);
						
						$('.last_commit_list').append(
							'<div class="item" >' +
								'<div class="title" ><i class="demo-icon icon-github-circled">&#xe801;</i> <a class="repo-link" href="' + repo.id + '" >' + repo.user + ' / ' + repo.repo + '</a></div>' +
								'<div class="message" >' +
									'<div class="date" ><i class="demo-icon icon-wristwatch">&#xe800;</i> ' + lu.toLocaleString() + ', ' + lc.commit.committer.email + '</div>' +
									'<div class="text" >' + lc.commit.message + '</div>' +
								'</div>' +
								'<div class="last-commit" ><a class="last-commit-link" href="' + lc.html_url + '" >' + chrome.i18n.getMessage('ui_last_commit') + ' <span class="r-arr" >&rarr;</span></a></div>' +
							'</div>'
							);
						
					}
				}
				
			}
			
			if(_i) {
				$('#commits-overflow-container').fadeIn('fast');
				$('.scroll-container[data-target="#commits-overflow-container"]').fadeIn('fast');
			} else {
				$('#commits-overflow-container').hide();
				$('.scroll-container[data-target="#commits-overflow-container"]').hide();
			}
			
			ta.val(_arr.join("\n"));
			
			updateLinkHref();
			
			$('.scroll-container').trigger('init');
			
		}
	});
}

function loadFixedMenuBtns() {
	
	var menu = $('.fixed-menu');
	
	$(document.body).on('click.fecss', '.fixed-menu .menu-item a', {}, function(event){
		event.preventDefault();
		
		var btn = $(this);
		var href = btn.attr('href');
		
		$('.action-block').hide();
		$(href + '.action-block').fadeIn('fast');
		
		menu.find('.menu-item.active').removeClass('active');
		btn.closest('.menu-item').addClass('active');
		
		$('.scroll-container').trigger('init');
		
	});
	
	menu.find('.menu-item').eq(0).find('a').trigger('click.fecss');
	
}

function loadAboutText() {
	
	var src = chrome.i18n.getMessage('ui_about_text_src');
	
	$.get(src, {}, function(data){
		$('#about-text').html(data);
		
		//updateLinkHref();
	});
	
}

$(document).ready(function(){
	
	loadAboutText();
	loadRepoList();
	loadFixedMenuBtns();
	
	$(document.body).on('submit', 'form', {}, saveRepoList);
	
});