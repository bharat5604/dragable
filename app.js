$(function () {
    $('.droptrue').on('click', 'li', function () {
        $(this).toggleClass('selected');
    });

    $("ul.droptrue").sortable({
        connectWith: 'ul.droptrue',
        opacity: 0.6,
        revert: true,
        helper: function (e, item) {
            console.log('parent-helper');
            console.log(item);
            if(!item.hasClass('selected'))
               item.addClass('selected');
            var elements = $('.selected').not('.ui-sortable-placeholder').clone();
            var helper = $('<ul/>');
            item.siblings('.selected').addClass('hidden');
            return helper.append(elements);
        },
        start: function (e, ui) {
            var elements = ui.item.siblings('.selected.hidden').not('.ui-sortable-placeholder');
            ui.item.data('items', elements);
        },
        receive: function (e, ui) {
            ui.item.before(ui.item.data('items'));
        },
        stop: function (e, ui) {
            ui.item.siblings('.selected').removeClass('hidden');
            $('.selected').removeClass('selected');
        },
        update: function(){
            updatePostOrder();
            updateAdd();
            updateAddThird();
        }
    });
   

    // $("#sortable1, #sortable2, #sortable3, #sortable4").disableSelection();
    // $("#sortable1, #sortable2, #sortable3, #sortable4").css('minHeight', $("#sortable1, #sortable2").height() + "px");
});

$('[data-search]').on('keyup', function() {
	var searchVal = $(this).val();
	var filterItems = $('[data-filter-item]');

	if ( searchVal != '' ) {
		filterItems.addClass('hidden');
		$('[data-filter-item][data-filter-name*="' + searchVal.toLowerCase() + '"]').removeClass('hidden');
	} else {
		filterItems.removeClass('hidden');
	}
});


function updatePostOrder() {
    var arr = [];
    $("#sortable2 li").each(function () {
        arr.push($(this).attr('id'));
    });
    $('#postOrder').val(arr.join(','));
}


function updateAdd() {
    var arr = [];
    $("#sortable3 li").each(function () {
        arr.push($(this).attr('id'));
    });
    $('#add').val(arr.join(','));
}

function updateAddThird() {
    var arr = [];
    $("#sortable4 li").each(function () {
        arr.push($(this).attr('id'));
    });
    $('#addThird').val(arr.join(','));
}
