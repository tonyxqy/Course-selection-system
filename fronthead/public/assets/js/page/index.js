if (typeof jQuery === "undefined") {
    throw new Error("jQuery plugins need to be before this file");
}
$(function() {
    "use strict";
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // project data table
    $(document).ready(function() {
        $('#myProjectTable')
        .addClass( 'nowrap' )
        .dataTable( {
            responsive: true,
            columnDefs: [
                { targets: [-1, -3], className: 'dt-body-right' }
            ]
        });
    });

    // Timeline
    $(document).ready(function() {
        var options = {
            chart: {
                height: 407,
                type: 'rangeBar',
                toolbar: {
                    show: false,
                }
            },        
            plotOptions: {
                bar: {
                    horizontal: true,                
                }
            },
            colors: ['var(--chart-color1)', 'var(--chart-color2)', 'var(--chart-color4)'],

            series: [{
                name: 'Justin',            
                data: [{
                    x: 'Design',
                    y: [new Date('2020-03-02').getTime(), new Date('2020-03-04').getTime()]
                }, {
                    x: 'MobileApp',
                    y: [new Date('2020-03-02').getTime(), new Date('2020-03-04').getTime()]
                 
                }, {
                    x: 'Infography',
                    y: [new Date('2020-03-04').getTime(), new Date('2020-03-07').getTime()]
                }, {
                    x: 'Protoyping',
                    y: [new Date('2020-03-11').getTime(), new Date('2020-03-12').getTime()]
                },{
                    x: 'Development',
                    y: [new Date('2020-03-02').getTime(), new Date('2020-03-03').getTime()]
                }]
            }, {
                name: 'Michael',
                data: [{
                    x: 'Design',
                    y: [new Date('2020-03-01').getTime(), new Date('2020-03-03').getTime()] 
                }, {
                    x: 'MobileApp',
                    y: [new Date('2020-03-03').getTime(), new Date('2020-03-07').getTime()] 
                }, {
                    x: 'Infography',
                    y: [new Date('2020-03-06').getTime(), new Date('2020-03-09').getTime()]
                }, {
                    x: 'Protoyping',
                    y: [new Date('2020-03-10').getTime(), new Date('2020-03-11').getTime()]
                },
                {
                    x: 'Development',
                    y: [new Date('2020-03-01').getTime(), new Date('2020-03-02').getTime()] 
                }]
            },{
                name: 'Jason',
                data: [{
                    x: 'Design',
                    y: [new Date('2020-03-03').getTime(), new Date('2020-03-05').getTime()] 
                }, {
                    x: 'MobileApp',
                    y: [new Date('2020-03-01').getTime(), new Date('2020-03-09').getTime()] 
                }, {
                    x: 'Infography',
                    y: [new Date('2020-03-05').getTime(), new Date('2020-03-08').getTime()]
                }, {
                    x: 'Protoyping',
                    y: [new Date('2020-03-11').getTime(), new Date('2020-03-17').getTime()]
                },
                {
                    x: 'Development',
                    y: [new Date('2020-03-03').getTime(), new Date('2020-03-05').getTime()] 
                }]
            }],
            yaxis: {
                min: new Date('2020-03-01').getTime(),
                max: new Date('2020-03-14').getTime(),
                max: new Date('2020-03-18').getTime(),
            },
            xaxis: {
               type: 'datetime'
            },
        }

    var chart = new ApexCharts(
            document.querySelector("#apex-timeline"),
            options
        );
        
        chart.render();
    });

    // Income Analytics
    $(document).ready(function() {
        var options = {
            align: 'center',
            series: [1242, 1047, 1352, 1458, 1465, 1889],
            responsive: [{
                breakpoint: 420,
                options: {
                    chart: {
                        width: 200,
                        align: 'center',
                    },
                    legend: {
                        position: 'bottom',
                        markers: {
                            fillColors:'var(--chart-color1)'
                        },
                        labels: {
                            colors: 'var(--chart-color1)'
                        },
                    }
                }
            }],
            chart: {
                height: 336,
                type: 'polarArea',
                toolbar: {
                    show: false,
                },
            },
            labels: ['France', 'India', 'Canada', 'Italy', 'Japan' , 'Us'],
            fill: {
                opacity: 1,
                colors: ['var(--chart-color1)', 'var(--chart-color2)', 'var(--chart-color3)', 'var(--chart-color4)', 'var(--chart-color5)', 'var(--chart-color6)'],
            },
            stroke: {
                width: 1,
                colors: undefined
            },
            yaxis: {
                show: false
            },
            legend: {
                position: 'bottom', // left, right, top, bottom
                horizontalAlign: 'center',  // left, right, center
            },
            plotOptions: {
                polarArea: {
                    rings: {
                        strokeWidth: 0
                    }
                }
            },
            theme: {
                monochrome: {
                enabled: true,
                shadeTo: 'light',
                shadeIntensity: 0.6
                }
            }
        };

        var chart = new ApexCharts(document.querySelector("#incomeanalytics"), options);
        chart.render();
    }); 
    
});

