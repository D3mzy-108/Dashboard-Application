// CARD DATA SETUP
var data_columns = $(".data_column")
var actions = $(".action")
var data_display_container = $(".data_display")

for (let i = 0; i < data_columns.length; i++) {
    var table_heads = $("thead tr th")
    var sum = 0
    var avg = 0
    for (let column_index = 0; column_index < table_heads.length; column_index++) {
        if (table_heads[column_index].textContent.toLowerCase().includes(data_columns[i].textContent.toLowerCase())) {
            var table_body_rows = $("tbody tr")
            for (let row_index = 0; row_index < table_body_rows.length; row_index++) {
                if (actions[i].textContent == "len") {
                    $(data_display_container[i]).text(row_index + 1)
                } else if (actions[i].textContent == "sum") {
                    var cell_data = $(table_body_rows[row_index].children[column_index]).text().split(",")
                    var compiled_cell_data = ""
                    for (let cell_data_index = 0; cell_data_index < cell_data.length; cell_data_index++) {
                        compiled_cell_data = compiled_cell_data + "" + cell_data[cell_data_index]
                    }
                    sum = sum + parseInt(compiled_cell_data)
                    var sum_text_format = ""

                    var runs = 0
                    for (let character = sum.toString().length - 1; character >= 0; character--) {
                        if (runs % 3 == 0 && character != sum.toString().length - 1) {
                            sum_text_format = sum.toString().charAt(character) + "," + sum_text_format
                        } else {
                            sum_text_format = sum.toString().charAt(character) + sum_text_format
                        }
                        runs++
                    }
                    $(data_display_container[i]).text(sum_text_format)
                } else if (actions[i].textContent == "avg") {
                    var cell_data = $(table_body_rows[row_index].children[column_index]).text().split(",")
                    var compiled_cell_data = ""
                    for (let cell_data_index = 0; cell_data_index < cell_data.length; cell_data_index++) {
                        compiled_cell_data = compiled_cell_data + "" + cell_data[cell_data_index]
                    }
                    sum = sum + parseInt(compiled_cell_data)
                    avg = sum / (row_index + 1)
                    var avg_text_format = ""

                    var runs = 0
                    for (let character = Math.round(avg).toString().length - 1; character >= 0; character--) {
                        if (runs % 3 == 0 && character != Math.round(avg).toString().length - 1) {
                            avg_text_format = Math.round(avg).toString().charAt(character) + "," + avg_text_format
                        } else {
                            avg_text_format = Math.round(avg).toString().charAt(character) + avg_text_format
                        }
                        runs++
                    }
                    $(data_display_container[i]).text(avg_text_format)
                }
            }
        }
    }
}
