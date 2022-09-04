// SET NEW COLUMN NAME FOR FILTERS
function setFilterColumnName() {
    var filter_cont = $(".column_filters")
    for (var column_index = 0; column_index < filter_cont.length; column_index++) {
        var heading_words = $(filter_cont[column_index].children[0].children[0]).text().split(" ")
        var newheading = ""

        for (let word_index = 0; word_index < heading_words.length; word_index++) {
            if (word_index == 0) {
                newheading = heading_words[word_index]
            } else {
                newheading = newheading + "_" + heading_words[word_index]
            }
        }
        $(filter_cont[column_index].children[0].children[1]).text(newheading)
    }
}
setFilterColumnName()

// FILTER COLUMNS

// ON OPERATOR CHANGE
$(".column_filters select").change((e) => {
    var table_heads = $("thead th")
    var table_data_rows = $("tbody tr")

    var queries = []
    var operator_values = []
    var query = $(".query")
    for (let query_index = 0; query_index < query.length; query_index++) {
        queries.push(query[query_index].value)
        operator_values.push(query[query_index].parentElement.children[2].value)
    }

    for (var i = 0; i < table_heads.length; i++) {
        if (table_heads[i].textContent == e.target.parentElement.children[0].textContent) {
            for (var row = 0; row < table_data_rows.length; row++) {
                // filterColumns(e.target.value, operator_value, table_data_rows[row], i)
                filterColumns(queries, operator_values, table_data_rows[row], i)
            }
        }
    }
})

// ON TEXT CHANGE
$(".column_filters .query").keyup((e) => {
    var table_heads = $("thead th")
    var table_data_rows = $("tbody tr")

    var queries = []
    var operator_values = []
    var query = $(".query")
    for (let query_index = 0; query_index < query.length; query_index++) {
        queries.push(query[query_index].value)
        operator_values.push(query[query_index].parentElement.children[2].value)
    }

    for (var i = 0; i < table_heads.length; i++) {
        if (table_heads[i].textContent == e.target.parentElement.children[0].textContent) {
            for (var row = 0; row < table_data_rows.length; row++) {
                // filterColumns(e.target.value, operator_value, table_data_rows[row], i)
                filterColumns(queries, operator_values, table_data_rows[row], i)
            }
        }
    }
})

// FILTER FUNCTION
function filterColumns(queries, operator_values, row, i) {
    var satisfied_queries = []
    for (var index = 0; index < queries.length; index++) {
        if (operator_values[index] == "contains") {
            if (row.children[index + 1].textContent.toLowerCase().includes(queries[index].toLowerCase()) || queries[index] == "" || queries[index] == " ") {
                // row.classList.remove('hidden')
                satisfied_queries.push(true)
            } else {
                // row.classList.add('hidden')
                satisfied_queries.push(false)
            }
        } else if (operator_values[index] == "==") {
            if (row.children[index + 1].textContent == queries[index] || queries[index] == "" || queries[index] == " ") {
                // row.classList.remove('hidden')
                satisfied_queries.push(true)
            } else {
                // row.classList.add('hidden')
                satisfied_queries.push(false)
            }
        } else if (operator_values[index] == ">") {
            if (parseFloat(row.children[index + 1].textContent) > parseFloat(queries[index]) || queries[index] == "" || queries[index] == " ") {
                // row.classList.remove('hidden')
                satisfied_queries.push(true)
            } else {
                // row.classList.add('hidden')
                satisfied_queries.push(false)
            }
        } else if (operator_values[index] == "<") {
            if (parseFloat(row.children[index + 1].textContent) < parseFloat(queries[index]) || queries[index] == "" || queries[index] == " ") {
                // row.classList.remove('hidden')
                satisfied_queries.push(true)
            } else {
                // row.classList.add('hidden')
                satisfied_queries.push(false)
            }
        } else if (operator_values[index] == ">=") {
            if (parseFloat(row.children[index + 1].textContent) >= parseFloat(queries[index]) || queries[index] == "" || queries[index] == " ") {
                // row.classList.remove('hidden')
                satisfied_queries.push(true)
            } else {
                // row.classList.add('hidden')
                satisfied_queries.push(false)
            }
        } else if (operator_values[index] == "<=") {
            if (parseFloat(row.children[index + 1].textContent) <= parseFloat(queries[index]) || queries[index] == "" || queries[index] == " ") {
                // row.classList.remove('hidden')
                satisfied_queries.push(true)
            } else {
                // row.classList.add('hidden')
                satisfied_queries.push(false)
            }
        } else if (operator_values[index] == "!=") {
            if (row.children[index + 1].textContent != queries[index] || queries[index] == "" || queries[index] == " ") {
                // row.classList.remove('hidden')
                satisfied_queries.push(true)
            } else {
                // row.classList.add('hidden')
                satisfied_queries.push(false)
            }
        }
    }
    is_satisfied = true
    for (var i = 0; i < satisfied_queries.length; i++) {
        if (is_satisfied == satisfied_queries[i] && satisfied_queries[i] == true) {
            is_satisfied = true
        } else {
            is_satisfied = false
        }
    }

    if (is_satisfied == true) {
        row.classList.remove('hidden')
    } else {
        row.classList.add('hidden')
    }
}
