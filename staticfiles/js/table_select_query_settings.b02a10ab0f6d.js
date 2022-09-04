// SELECT ALL QUERY
$(".select_all").click(() => {
    var checkboxes = $(".select_filters input")
    for (var checkbox_index = 0; checkbox_index < checkboxes.length; checkbox_index++) {
        checkboxes[checkbox_index].checked = false

        checkboxes[checkbox_index].parentElement.classList.add('border-indigo-500')
        checkboxes[checkbox_index].parentElement.classList.remove('border-gray-300')

        var table_heads = $("thead th")
        var table_data_rows = $("tbody tr")

        for (var i = 0; i < table_heads.length; i++) {
            if (table_heads[i].textContent == checkboxes[checkbox_index].parentElement.children[1].textContent) {
                table_heads[i].classList.remove('hidden')
                for (var row = 0; row < table_data_rows.length; row++) {
                    table_data_rows[row].children[i].classList.remove('hidden')
                }
            }
        }

    }
    $(".select_all").addClass("hidden")
    $(".deselect_all").removeClass("hidden")
})

// DESELECT ALL QUERY
$(".deselect_all").click(() => {
    var checkboxes = $(".select_filters input")
    for (var checkbox_index = 0; checkbox_index < checkboxes.length; checkbox_index++) {
        checkboxes[checkbox_index].checked = false

        checkboxes[checkbox_index].parentElement.classList.remove('border-indigo-500')
        checkboxes[checkbox_index].parentElement.classList.add('border-gray-300')

        var table_heads = $("thead th")
        var table_data_rows = $("tbody tr")

        for (var i = 0; i < table_heads.length; i++) {
            if (table_heads[i].textContent == checkboxes[checkbox_index].parentElement.children[1].textContent) {
                table_heads[i].classList.add('hidden')
                for (var row = 0; row < table_data_rows.length; row++) {
                    table_data_rows[row].children[i].classList.add('hidden')
                }
            }
        }

    }
    $(".deselect_all").addClass("hidden")
    $(".select_all").removeClass("hidden")
})

// SELECT QUERY FILTERS
$(".select_filters input").change((e) => {
    if (e.target.parentElement.children[0].checked) {
        e.target.parentElement.classList.remove('border-gray-300')
        e.target.parentElement.classList.add('border-indigo-500')

        var table_heads = $("thead th")
        var table_data_rows = $("tbody tr")

        for (var i = 0; i < table_heads.length; i++) {
            if (table_heads[i].textContent == e.target.parentElement.children[1].textContent) {
                table_heads[i].classList.remove('hidden')
                for (var row = 0; row < table_data_rows.length; row++) {
                    table_data_rows[row].children[i].classList.remove('hidden')
                }
            }
        }

    } else {
        e.target.parentElement.classList.remove('border-indigo-500')
        e.target.parentElement.classList.add('border-gray-300')

        var table_heads = $("thead th")
        var table_data_rows = $("tbody tr")

        for (var i = 0; i < table_heads.length; i++) {
            if (table_heads[i].textContent == e.target.parentElement.children[1].textContent) {
                table_heads[i].classList.add('hidden')
                for (var row = 0; row < table_data_rows.length; row++) {
                    table_data_rows[row].children[i].classList.add('hidden')
                }
            }
        }

    }
})
