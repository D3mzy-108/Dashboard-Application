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

if ($(chart_1_x_axis_wrapper).text().toLowerCase() == "") {
    first_setdata.labels.push("No data")
    first_setdata.datasets[0].data.push(1)
    first_setdata.datasets[0].backgroundColor.push("#ddd")
} else {
    for (let column_index = 0; column_index < table_heads.length; column_index++) {
        if (table_heads[column_index].textContent.toLowerCase().includes($(chart_1_x_axis_wrapper).text().toLowerCase())) {
            var table_body_rows = $("tbody tr")
            for (let row_index = 0; row_index < table_body_rows.length; row_index++) {
                chart_1_labels.push(table_body_rows[row_index].children[column_index].textContent)
            }
        }

        if (table_heads[column_index].textContent.toLowerCase().includes($(chart_1_y_axis_wrapper).text().toLowerCase())) {
            var table_body_rows = $("tbody tr")
            for (let row_index = 0; row_index < table_body_rows.length; row_index++) {
                chart_1_data.push(table_body_rows[row_index].children[column_index].textContent)
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
    type: 'doughnut',
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

if ($(chart_2_x_axis_wrapper).text().toLowerCase() == "") {
    second_setdata.labels.push("No data")
    second_setdata.datasets[0].data.push(0)
    second_setdata.datasets[0].backgroundColor.push("#ddd")
} else {
    for (let column_index = 0; column_index < table_heads.length; column_index++) {
        if (table_heads[column_index].textContent.toLowerCase().includes($(chart_2_x_axis_wrapper).text().toLowerCase())) {
            var table_body_rows = $("tbody tr")
            for (let row_index = 0; row_index < table_body_rows.length; row_index++) {
                chart_2_labels.push(table_body_rows[row_index].children[column_index].textContent)
            }
        }

        if (table_heads[column_index].textContent.toLowerCase().includes($(chart_2_y_axis_wrapper).text().toLowerCase())) {
            var table_body_rows = $("tbody tr")
            for (let row_index = 0; row_index < table_body_rows.length; row_index++) {
                chart_2_data.push(table_body_rows[row_index].children[column_index].textContent)
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
    type: 'line',
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