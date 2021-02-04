var initialise_form = function(selectionOptions) {
    var filterers = $('.filter_block input');
    filterers.change(function() {
        var filters = [];
        var targets = [];
        filterers.filter(function() {
            return !this.checked
        }).each(function(k, v) {
            filters[k] = v.value;
            targets[k] = $(v).data('target');
        });
        use_filters(filters, targets);
    });

    var filterers1 = $('.filter_block1 input');
    filterers1.change(function() {
        var filters = [];
        var targets = [];
        filterers1.filter(function() {
            return !this.checked
        }).each(function(k, v) {
            filters[k] = v.value;
            targets[k] = $(v).data('target');
        });
        use_filters(filters, targets);
    });

    var filterers2 = $('.filter_block2 input');
    filterers2.change(function() {
        var filters = [];
        var targets = [];
        filterers2.filter(function() {
            return !this.checked
        }).each(function(k, v) {
            filters[k] = v.value;
            targets[k] = $(v).data('target');
        });
        use_filters(filters, targets);
    });

    var filterers3 = $('.filter_block3 input');
    filterers3.change(function() {
        var filters = [];
        var targets = [];
        filterers3.filter(function() {
            return !this.checked
        }).each(function(k, v) {
            filters[k] = v.value;
            targets[k] = $(v).data('target');
        });
        use_filters(filters, targets);
    });

    var filterers4 = $('.filter_block4 input');
    filterers4.change(function() {
        var filters = [];
        var targets = [];
        filterers4.filter(function() {
            return !this.checked
        }).each(function(k, v) {
            filters[k] = v.value;
            targets[k] = $(v).data('target');
        });
        use_filters(filters, targets);
    });

    var groupSelect = $('#group-everything-by');
    for (var opt in selectionOptions) {
        var lookup = selectionOptions[opt];
        if (lookup.title != 'Proveedor' && lookup.title != 'Área requirente' ) {
            groupSelect.append('<option value="' + lookup.key + '">' + lookup.title + '</option>');
        }
    }
    var ResetGrouping = function() {
        var groupBy = groupSelect.val();
        group_by(groupBy);
    };
    groupSelect.change(ResetGrouping);
    var colorSelect = $('#color-everything-by');
    for (var opt in selectionOptions) {
        var lookup = selectionOptions[opt];
        colorSelect.append('<option value="' + lookup.key + '">' + lookup.title + '</option>');
    }
    var ResetColors = function() {
        var colorBy = colorSelect.val();
        color_by(colorBy);
    };
    $('#clear_filters').click(function() {
        if ($(this).hasClass('select')) {
            $('.filter_block input').prop('checked', 'checked');
        } else {
            $('.filter_block input').prop('checked', false);
        }
        $(this).toggleClass('select clear');
        filterers.change();
        return false;
    });
    $('#clear_filters1').click(function() {
        if ($(this).hasClass('select')) {
            $('.filter_block1 input').prop('checked', 'checked');
        } else {
            $('.filter_block1 input').prop('checked', false);
        }
        $(this).toggleClass('select clear');
        filterers1.change();
        return false;
    });
    $('#clear_filters2').click(function() {
        if ($(this).hasClass('select')) {
            $('.filter_block2 input').prop('checked', 'checked');
        } else {
            $('.filter_block2 input').prop('checked', false);
        }
        $(this).toggleClass('select clear');
        filterers2.change();
        return false;
    });
    $('#clear_filters3').click(function() {
        if ($(this).hasClass('select')) {
            $('.filter_block3 input').prop('checked', 'checked');
        } else {
            $('.filter_block3 input').prop('checked', false);
        }
        $(this).toggleClass('select clear');
        filterers3.change();
        return false;
    });
    $('#clear_filters4').click(function() {
        if ($(this).hasClass('select')) {
            $('.filter_block4 input').prop('checked', 'checked');
        } else {
            $('.filter_block4 input').prop('checked', false);
        }
        $(this).toggleClass('select clear');
        filterers4.change();
        return false;
    });
    colorSelect.change(ResetColors);
};

$('#filtros').on({
    "click":function(e){
        e.stopPropagation();
    }
});

function get_distinct_values(data, keyType, key) {
    var allValues = {};
    for (var i in data) {
        var value = data[i][key];
        allValues[value] = true;
    }
    var allValuesArray = [];
    for (var i in allValues) allValuesArray.push(i);
    allValuesArray.sort();
    return allValuesArray
}

function keyToLookup(key) {
    var firstPartEnds = key.indexOf(':');
    if (firstPartEnds <= 0) return {
        key: key,
        type: key,
        title: key
    };
    var firstPart = key.substring(0, firstPartEnds);
    var secondPart = key.substring(firstPartEnds + 1);
    return {
        key: key,
        type: firstPart,
        title: secondPart
    };
}

function render_filters_colors_and_groups(data) {
    var first = data[0];

    var lookups = [];
    var lookups1 = [];
    var lookups2 = [];
    var lookups3 = [];
    var lookups4 = [];
    for (var key in first) {
        var lookup = keyToLookup(key);
        var lookup1 = keyToLookup(key);
        var lookup2 = keyToLookup(key);
        var lookup3 = keyToLookup(key);
        var lookup4 = keyToLookup(key);
        // SELECCIONA LOS CAMPOS A FILTRAR

        if (lookup.type == "Proveedor"){
            lookups.push(lookup);
        }
        if (lookup1.type == "Procedimiento de contratación"){
            lookups1.push(lookup1);
        }
        if (lookup2.type == "Destino de contratación"){
            lookups2.push(lookup2);
        }
        if (lookup3.type == "Vigencia del contrato"){
            lookups3.push(lookup3);
        }
        if (lookup4.type == "Área requirente"){
            lookups4.push(lookup4);
        }
    }

    var filterList = $('#filter-list');
    for (var i in lookups) {
        var lookup = lookups[i];
        var values = get_distinct_values (data, lookup.type, lookup.key);
        var item = $('<div class="filter_block col-md-4"><li class="filter_title"><p style="color:#00cc99;"><strong>' + lookup.title + '</strong></p></li></div>');
        for (var j in values) {
            var checkbox = $('<li class="sub-filter-block"><label style="cursor:pointer"><input style="cursor:pointer" data-target="' + lookup.key + '" type="checkbox" checked="checked" value="' + values[j] + '"/> ' + values[j] + '</label></li>');
            checkbox.appendTo(item);
        }
        item.appendTo(filterList);
    }

    var filterList1 = $('#filter-list1');
    for (var i in lookups1) {
        var lookup1 = lookups1[i];
        var values = get_distinct_values (data, lookup1.type, lookup1.key);
        var item = $('<div class="filter_block1 col-md-4"><li class="filter_title"><p style="color:#00cc99;"><strong>' + lookup1.title + '</strong></p></li></div>');
        for (var j in values) {
            var checkbox = $('<li class="sub-filter-block"><label style="cursor:pointer"><input style="cursor:pointer" data-target="' + lookup1.key + '" type="checkbox" checked="checked" value="' + values[j] + '"/> ' + values[j] + '</label></li>');
            checkbox.appendTo(item);
        }
        item.appendTo(filterList1);
    }

    var filterList2 = $('#filter-list2');
    for (var i in lookups2) {
        var lookup2 = lookups2[i];
        var values = get_distinct_values (data, lookup2.type, lookup2.key);
        var item = $('<div class="filter_block2 col-md-4"><li class="filter_title"><p style="color:#00cc99;"><strong>' + lookup2.title + '</strong></p></li></div>');
        for (var j in values) {
            var checkbox = $('<li class="sub-filter-block"><label style="cursor:pointer"><input style="cursor:pointer" data-target="' + lookup2.key + '" type="checkbox" checked="checked" value="' + values[j] + '"/> ' + values[j] + '</label></li>');
            checkbox.appendTo(item);
        }
        item.appendTo(filterList2);
    }

    var filterList3 = $('#filter-list3');
    for (var i in lookups3) {
        var lookup3 = lookups3[i];
        var values = get_distinct_values (data, lookup3.type, lookup3.key);
        var item = $('<div class="filter_block3 col-md-4"><li class="filter_title"><p style="color:#00cc99;"><strong>' + lookup3.title + '</strong></p></li></div>');
        for (var j in values) {
            var checkbox = $('<li class="sub-filter-block"><label style="cursor:pointer"><input style="cursor:pointer" data-target="' + lookup3.key + '" type="checkbox" checked="checked" value="' + values[j] + '"/> ' + values[j] + '</label></li>');
            checkbox.appendTo(item);
        }
        item.appendTo(filterList3);
    }

    var filterList4 = $('#filter-list4');
    for (var i in lookups4) {
        var lookup4 = lookups4[i];
        var values = get_distinct_values (data, lookup4.type, lookup4.key);
        var item = $('<div class="filter_block4 col-md-4"><li class="filter_title"><p style="color:#00cc99;"><strong>' + lookup4.title + '</strong></p></li></div>');
        for (var j in values) {
            var checkbox = $('<li class="sub-filter-block"><label style="cursor:pointer"><input style="cursor:pointer" data-target="' + lookup4.key + '" type="checkbox" checked="checked" value="' + values[j] + '"/> ' + values[j] + '</label></li>');
            checkbox.appendTo(item);
        }
        item.appendTo(filterList4);
    }

    initialise_form(lookups);
}

function hide_color_chart() {
    var colorbar = $('#color-hints');
    colorbar.fadeOut(500, function() {
        $(this).empty();
    });
}

function show_color_chart(what_to_color_by, color_mapper) {
    var colorbar = $('#color-hints');
    colorbar.fadeOut(500, function() {
        colorbar.empty();
        var lookup = keyToLookup(what_to_color_by);
        $('<h4>' + lookup.title + ':</h4>').appendTo(colorbar);
        var row = $('<div class="row" />');
        for (var key in color_mapper) {
            var cell = $('<div class="col-md-3" />');
            var square = $('<div style="width: 15px; height: 15px; background: ' + color_mapper[key] + ';  display: inline-block; vertical-align: middle;">&nbsp;</div><p style="display: inline;"> '+ key +' </p>');
            square.appendTo(cell);
            cell.appendTo(row);
            cell.appendTo(row);
        }
        row.appendTo(colorbar);
        colorbar.fadeIn(500);
    });
}