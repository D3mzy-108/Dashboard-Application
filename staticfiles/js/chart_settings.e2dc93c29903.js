// CHART 1 SETUP

// CHART CONFIGURATION
const first_setdata = {
    labels: [],
    datasets: [
        {
            label: '',
            data: [],
            backgroundColor: [],
        }
    ]
};

// FETCHING DATA
let chart_1_x_axis_wrapper = $("#chart_1_x_axis")
let chart_1_y_axis_wrapper = $("#chart_1_y_axis")
let chart_1_grouped_wrapper = $("#chart_1_group_common_data")
var table_heads = $("thead tr th")
let chart_1_labels = []
let chart_1_data = []
let chart_1_type = $("#chart_1_type").text()

if ($(chart_1_x_axis_wrapper).text().toLowerCase() == "") {
    first_setdata.labels.push("No data")
    first_setdata.datasets[0].data.push(0)
    first_setdata.datasets[0].backgroundColor.push("#ddd")
} else {
    for (let column_index = 0; column_index < table_heads.length; column_index++) {
        // X AXIS DATA
        if (table_heads[column_index].textContent.toLowerCase() == $(chart_1_x_axis_wrapper).text().toLowerCase()) {
            var table_body_rows = $("tbody tr")
            for (let row_index = 0; row_index < table_body_rows.length; row_index++) {
                chart_1_labels.push(table_body_rows[row_index].children[column_index].textContent)
            }
        }

        // Y AXIS DATA
        if (table_heads[column_index].textContent.toLowerCase() == $(chart_1_y_axis_wrapper).text().toLowerCase()) {
            var table_body_rows = $("tbody tr")
            for (let row_index = 0; row_index < table_body_rows.length; row_index++) {
                var cell_data = $(table_body_rows[row_index].children[column_index]).text().split(",")
                var compiled_cell_data = ""
                for(let cell_data_index = 0; cell_data_index < cell_data.length; cell_data_index++){
                    compiled_cell_data = compiled_cell_data + "" + cell_data[cell_data_index]
                }
                chart_1_data.push(compiled_cell_data)
            }
        }
    }

    for (let index = 0; index < chart_1_labels.length; index++) {
        if ($(chart_1_grouped_wrapper).text().toLowerCase() == "true") {
            let existing_labels = 0
            for (let label_index = 0; label_index < first_setdata.labels.length; label_index++) {
                if (chart_1_labels[index] == first_setdata.labels[label_index]) {
                    existing_labels++
                }
            }
            if (existing_labels == 0) {
                first_setdata.labels.push(chart_1_labels[index])
                first_setdata.datasets[0].data.push(chart_1_data[index])
            } else {
                for (let label_index = 0; label_index < first_setdata.labels.length; label_index++) {
                    if (chart_1_labels[index] == first_setdata.labels[label_index]) {
                        console.log()
                        first_setdata.datasets[0].data[label_index] = parseFloat(first_setdata.datasets[0].data[label_index]) + parseFloat(chart_1_data[index])
                    }
                }
            }
        } else {
            first_setdata.labels.push(chart_1_labels[index])
            first_setdata.datasets[0].data.push(chart_1_data[index])
        }
    }

    // SETTING CHART ITEM BACKGROUND
    for (let data_index = 0; data_index < first_setdata.datasets[0].data.length; data_index++) {
        first_setdata.datasets[0].backgroundColor.push(`rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, .5)`)
    }
}

const first_config = {
    type: chart_1_type == "" ? 'bar' : chart_1_type,
    data: first_setdata,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: $("#chart_1_title").text(),
                align: 'start',
                color: '#333',
                position: 'bottom'
            }
        },
        maintainAspectRatio: true,
    },
};

const myChart = new Chart(
    document.getElementById('chart1'),
    config = first_config
);


// CHART 2 SETUP

// CHART CONFIGURATIONS
const second_setdata = {
    labels: [],
    datasets: [
        {
            label: '',
            data: [],
            backgroundColor: ["rgba(134, 204, 246, .3)"],
            borderColor: "#93C5FD",
            fill: true,
        }
    ]
};

// FETCHING DATA
let chart_2_x_axis_wrapper = $("#chart_2_x_axis")
let chart_2_y_axis_wrapper = $("#chart_2_y_axis")
let chart_2_grouped_wrapper = $("#chart_2_group_common_data")
var table_heads = $("thead tr th")
let chart_2_labels = []
let chart_2_data = []
let chart_2_type = $("#chart_2_type").text()

if ($(chart_2_x_axis_wrapper).text().toLowerCase() == "") {
    second_setdata.labels.push("No data")
    second_setdata.datasets[0].data.push(0)
    second_setdata.datasets[0].backgroundColor.push("#ddd")
} else {
    for (let column_index = 0; column_index < table_heads.length; column_index++) {
        // X AXIS DATA
        if (table_heads[column_index].textContent.toLowerCase().includes($(chart_2_x_axis_wrapper).text().toLowerCase())) {
            var table_body_rows = $("tbody tr")
            for (let row_index = 0; row_index < table_body_rows.length; row_index++) {
                chart_2_labels.push(table_body_rows[row_index].children[column_index].textContent)
            }
        }

        // Y AXIS DATA
        if (table_heads[column_index].textContent.toLowerCase().includes($(chart_2_y_axis_wrapper).text().toLowerCase())) {
            var table_body_rows = $("tbody tr")
            for (let row_index = 0; row_index < table_body_rows.length; row_index++) {
                var cell_data = $(table_body_rows[row_index].children[column_index]).text().split(",")
                var compiled_cell_data = ""
                for(let cell_data_index = 0; cell_data_index < cell_data.length; cell_data_index++){
                    compiled_cell_data = compiled_cell_data + "" + cell_data[cell_data_index]
                }
                chart_2_data.push(compiled_cell_data)
            }
        }
    }

    for (let index = 0; index < chart_2_labels.length; index++) {
        if ($(chart_2_grouped_wrapper).text().toLowerCase() == "true") {
            let existing_labels = 0
            for (let label_index = 0; label_index < second_setdata.labels.length; label_index++) {
                if (chart_2_labels[index] == second_setdata.labels[label_index]) {
                    existing_labels++
                }
            }
            if (existing_labels == 0) {
                second_setdata.labels.push(chart_2_labels[index])
                second_setdata.datasets[0].data.push(chart_2_data[index])
            } else {
                for (let label_index = 0; label_index < second_setdata.labels.length; label_index++) {
                    if (chart_2_labels[index] == second_setdata.labels[label_index]) {
                        console.log()
                        second_setdata.datasets[0].data[label_index] = parseFloat(second_setdata.datasets[0].data[label_index]) + parseFloat(chart_2_data[index])
                    }
                }
            }
        } else {
            second_setdata.labels.push(chart_2_labels[index])
            second_setdata.datasets[0].data.push(chart_2_data[index])
        }
    }

    // SETTING CHART ITEM BACKGROUND
    for (let data_index = 0; data_index < second_setdata.datasets[0].data.length; data_index++) {
        second_setdata.datasets[0].backgroundColor.push(`rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, .5)`)
    }
}

const second_config = {
    type: chart_2_type == "" ? 'bar' : chart_2_type,
    data: second_setdata,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: true,
                text: $("#chart_2_title").text(),
                padding: 20,
                color: '#333',
            }
        }
    },
};

const myChart2 = new Chart(
    document.getElementById('chart2'),
    config = second_config
);


// CHART 3 SETUP

// CHART CONFIGURATION
const third_setdata = {
    labels: [],
    datasets: [
        {
            label: '',
            data: [],
            backgroundColor: [],
        }
    ]
};

// FETCHING DATA
let chart_3_x_axis_wrapper = $("#chart_3_x_axis")
let chart_3_y_axis_wrapper = $("#chart_3_y_axis")
let chart_3_grouped_wrapper = $("#chart_3_group_common_data")
var table_heads = $("thead tr th")
let chart_3_labels = []
let chart_3_data = []
let chart_3_type = $("#chart_3_type").text()

if ($(chart_3_x_axis_wrapper).text().toLowerCase() == "") {
    third_setdata.labels.push("No data")
    third_setdata.datasets[0].data.push(0)
    third_setdata.datasets[0].backgroundColor.push("#ddd")
} else {
    for (let column_index = 0; column_index < table_heads.length; column_index++) {
        // X AXIS DATA
        if (table_heads[column_index].textContent.toLowerCase() == $(chart_3_x_axis_wrapper).text().toLowerCase()) {
            var table_body_rows = $("tbody tr")
            for (let row_index = 0; row_index < table_body_rows.length; row_index++) {
                chart_3_labels.push(table_body_rows[row_index].children[column_index].textContent)
            }
        }

        // Y AXIS DATA
        if (table_heads[column_index].textContent.toLowerCase() == $(chart_3_y_axis_wrapper).text().toLowerCase()) {
            var table_body_rows = $("tbody tr")
            for (let row_index = 0; row_index < table_body_rows.length; row_index++) {
                var cell_data = $(table_body_rows[row_index].children[column_index]).text().split(",")
                var compiled_cell_data = ""
                for(let cell_data_index = 0; cell_data_index < cell_data.length; cell_data_index++){
                    compiled_cell_data = compiled_cell_data + "" + cell_data[cell_data_index]
                }
                chart_3_data.push(compiled_cell_data)
            }
        }
    }

    for (let index = 0; index < chart_3_labels.length; index++) {
        if ($(chart_3_grouped_wrapper).text().toLowerCase() == "true") {
            let existing_labels = 0
            for (let label_index = 0; label_index < third_setdata.labels.length; label_index++) {
                if (chart_3_labels[index] == third_setdata.labels[label_index]) {
                    existing_labels++
                }
            }
            if (existing_labels == 0) {
                third_setdata.labels.push(chart_3_labels[index])
                third_setdata.datasets[0].data.push(chart_3_data[index])
            } else {
                for (let label_index = 0; label_index < third_setdata.labels.length; label_index++) {
                    if (chart_3_labels[index] == third_setdata.labels[label_index]) {
                        console.log()
                        third_setdata.datasets[0].data[label_index] = parseFloat(third_setdata.datasets[0].data[label_index]) + parseFloat(chart_3_data[index])
                    }
                }
            }
        } else {
            third_setdata.labels.push(chart_3_labels[index])
            third_setdata.datasets[0].data.push(chart_3_data[index])
        }
    }

    // SETTING CHART ITEM BACKGROUND
    for (let data_index = 0; data_index < third_setdata.datasets[0].data.length; data_index++) {
        third_setdata.datasets[0].backgroundColor.push(`rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, .5)`)
    }
}

const third_config = {
    type: chart_3_type == "" ? 'bar' : chart_3_type,
    data: third_setdata,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'right',
            },
            title: {
                display: true,
                text: $("#chart_3_title").text(),
                align: 'center',
                padding: 20,
                color: '#333',
                position: 'top'
            }
        },
        maintainAspectRatio: true,
    },
};

const myChart3 = new Chart(
    document.getElementById('chart3'),
    config = third_config
);


// CHART 4 SETUP

// CHART CONFIGURATIONS
const fourth_setdata = {
    labels: [],
    datasets: [
        {
            label: '',
            data: [],
            backgroundColor: ["rgba(134, 204, 246, .3)"],
            borderColor: "#93C5FD",
            fill: true,
        }
    ]
};

// FETCHING DATA
let chart_4_x_axis_wrapper = $("#chart_4_x_axis")
let chart_4_y_axis_wrapper = $("#chart_4_y_axis")
let chart_4_grouped_wrapper = $("#chart_4_group_common_data")
var table_heads = $("thead tr th")
let chart_4_labels = []
let chart_4_data = []
let chart_4_type = $("#chart_4_type").text()

if ($(chart_4_x_axis_wrapper).text().toLowerCase() == "") {
    fourth_setdata.labels.push("No data")
    fourth_setdata.datasets[0].data.push(0)
    fourth_setdata.datasets[0].backgroundColor.push("#ddd")
} else {
    for (let column_index = 0; column_index < table_heads.length; column_index++) {
        // X AXIS DATA
        if (table_heads[column_index].textContent.toLowerCase().includes($(chart_4_x_axis_wrapper).text().toLowerCase())) {
            var table_body_rows = $("tbody tr")
            for (let row_index = 0; row_index < table_body_rows.length; row_index++) {
                chart_4_labels.push(table_body_rows[row_index].children[column_index].textContent)
            }
        }

        // Y AXIS DATA
        if (table_heads[column_index].textContent.toLowerCase().includes($(chart_4_y_axis_wrapper).text().toLowerCase())) {
            var table_body_rows = $("tbody tr")
            for (let row_index = 0; row_index < table_body_rows.length; row_index++) {
                var cell_data = $(table_body_rows[row_index].children[column_index]).text().split(",")
                var compiled_cell_data = ""
                for(let cell_data_index = 0; cell_data_index < cell_data.length; cell_data_index++){
                    compiled_cell_data = compiled_cell_data + "" + cell_data[cell_data_index]
                }
                chart_4_data.push(compiled_cell_data)
            }
        }
    }

    for (let index = 0; index < chart_4_labels.length; index++) {
        if ($(chart_4_grouped_wrapper).text().toLowerCase() == "true") {
            let existing_labels = 0
            for (let label_index = 0; label_index < fourth_setdata.labels.length; label_index++) {
                if (chart_4_labels[index] == fourth_setdata.labels[label_index]) {
                    existing_labels++
                }
            }
            if (existing_labels == 0) {
                fourth_setdata.labels.push(chart_4_labels[index])
                fourth_setdata.datasets[0].data.push(chart_4_data[index])
            } else {
                for (let label_index = 0; label_index < fourth_setdata.labels.length; label_index++) {
                    if (chart_4_labels[index] == fourth_setdata.labels[label_index]) {
                        console.log()
                        fourth_setdata.datasets[0].data[label_index] = parseFloat(fourth_setdata.datasets[0].data[label_index]) + parseFloat(chart_4_data[index])
                    }
                }
            }
        } else {
            fourth_setdata.labels.push(chart_4_labels[index])
            fourth_setdata.datasets[0].data.push(chart_4_data[index])
        }
    }

    // SETTING CHART ITEM BACKGROUND
    for (let data_index = 0; data_index < fourth_setdata.datasets[0].data.length; data_index++) {
        fourth_setdata.datasets[0].backgroundColor.push(`rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, .5)`)
    }
}

const fourth_config = {
    type: chart_4_type == "" ? 'bar' : chart_4_type,
    data: fourth_setdata,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: true,
                text: $("#chart_4_title").text(),
                padding: 20,
                color: '#333',
            }
        }
    },
};

const myChart4 = new Chart(
    document.getElementById('chart4'),
    config = fourth_config
);


// CHART 4 SETUP

// CHART CONFIGURATIONS
const fifth_setdata = {
    labels: [],
    datasets: [
        {
            label: '',
            data: [],
            backgroundColor: ["rgba(134, 204, 246, .3)"],
            borderColor: "",
            fill: true,
        }
    ]
};

// FETCHING DATA
let chart_5_x_axis_wrapper = $("#chart_5_x_axis")
let chart_5_y_axis_wrapper = $("#chart_5_y_axis")
let chart_5_grouped_wrapper = $("#chart_5_group_common_data")
var table_heads = $("thead tr th")
let chart_5_labels = []
let chart_5_data = []
let chart_5_type = $("#chart_5_type").text()

if ($(chart_5_x_axis_wrapper).text().toLowerCase() == "") {
    fifth_setdata.labels.push("No data")
    fifth_setdata.datasets[0].data.push(0)
    fifth_setdata.datasets[0].backgroundColor.push("#ddd")
} else {
    for (let column_index = 0; column_index < table_heads.length; column_index++) {
        // X AXIS DATA
        if (table_heads[column_index].textContent.toLowerCase().includes($(chart_5_x_axis_wrapper).text().toLowerCase())) {
            var table_body_rows = $("tbody tr")
            for (let row_index = 0; row_index < table_body_rows.length; row_index++) {
                chart_5_labels.push(table_body_rows[row_index].children[column_index].textContent)
            }
        }

        // Y AXIS DATA
        if (table_heads[column_index].textContent.toLowerCase().includes($(chart_5_y_axis_wrapper).text().toLowerCase())) {
            var table_body_rows = $("tbody tr")
            for (let row_index = 0; row_index < table_body_rows.length; row_index++) {
                var cell_data = $(table_body_rows[row_index].children[column_index]).text().split(",")
                var compiled_cell_data = ""
                for(let cell_data_index = 0; cell_data_index < cell_data.length; cell_data_index++){
                    compiled_cell_data = compiled_cell_data + "" + cell_data[cell_data_index]
                }
                chart_5_data.push(compiled_cell_data)
            }
        }
    }

    for (let index = 0; index < chart_5_labels.length; index++) {
        if ($(chart_5_grouped_wrapper).text().toLowerCase() == "true") {
            let existing_labels = 0
            for (let label_index = 0; label_index < fifth_setdata.labels.length; label_index++) {
                if (chart_5_labels[index] == fifth_setdata.labels[label_index]) {
                    existing_labels++
                }
            }
            if (existing_labels == 0) {
                fifth_setdata.labels.push(chart_5_labels[index])
                fifth_setdata.datasets[0].data.push(chart_5_data[index])
            } else {
                for (let label_index = 0; label_index < fifth_setdata.labels.length; label_index++) {
                    if (chart_5_labels[index] == fifth_setdata.labels[label_index]) {
                        console.log()
                        fifth_setdata.datasets[0].data[label_index] = parseFloat(fifth_setdata.datasets[0].data[label_index]) + parseFloat(chart_5_data[index])
                    }
                }
            }
        } else {
            fifth_setdata.labels.push(chart_5_labels[index])
            fifth_setdata.datasets[0].data.push(chart_5_data[index])
        }
    }

    // SETTING CHART ITEM BACKGROUND
    for (let data_index = 0; data_index < fifth_setdata.datasets[0].data.length; data_index++) {
        fifth_setdata.datasets[0].backgroundColor.push(`rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, .5)`)
    }
}

const fifth_config = {
    type: chart_5_type == "" ? 'bar' : chart_5_type,
    data: fifth_setdata,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: true,
                text: $("#chart_5_title").text(),
                padding: 20,
                color: '#333',
            }
        }
    },
};

fifth_config.type == "line" ? fifth_setdata.datasets[0].borderColor = "#93C5FD" : fifth_setdata.datasets[0].borderColor = "#FFFFFF"

const myChart5 = new Chart(
    document.getElementById('chart5'),
    config = fifth_config
);