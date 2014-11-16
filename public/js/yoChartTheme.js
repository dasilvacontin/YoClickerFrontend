var amethyst = '#9B59B6';
var yoColors = ["#1ABC9C", "#2ECC71", "#3498DB", "#34495E", "#16A085", "#F1C40F", "#2980B9", "#8E44AD"];

Highcharts.theme = {
   colors: yoColors,
   chart: {
      backgroundColor: amethyst,
      style: {
         fontFamily: "'Montserrat', sans-serif",
      },
      plotBorderWidth: 0,
      spacing: 30,
   },
   title: {
      style: {
         padding: '0px 50px',
         color: 'white',
         textTransform: 'uppercase',
         fontSize: '50px'
      }
   },
   plotOptions: {
      pie: {
         borderColor: amethyst,
         borderWidth: 0,
         dataLabels: {
            distance: 50,
            connectorWidth: 5,
            softConnector: false,
            format: '{point.name} [{point.y}]',
            style: {
               fontSize: '25px',
               textTransform: 'uppercase',
               color: 'white',
               textAlign: 'center'
            }
         },
         showInLegend: true,
         tooltip: {
            pointFormat: 'Votes: <b>{point.y}</b>'
         },
      }
   },
   legend: {
      enabled: false,
      align: 'center',
      itemStyle: {
         color: 'white'
      },
      symbolHeight: 40,
      symbolWidth: 40,
      itemDistance: 80,
      itemMarginTop: 10,
      itemMarginBottom: 10,
      labelFormat: '{name}',
      itemStyle: {
         fontSize: '40px',
         lineHeight: '40px',
         color: 'white'
      },
      itemHoverStyle: {
         color: 'white'
      }
   },
   tooltip : {
      enabled: true
   },
   credits: {
      style: {
         color: '#666'
      }
   },
   labels: {
      style: {
         color: '#707073'
      }
   },

   drilldown: {
      activeAxisLabelStyle: {
         color: '#F0F0F3'
      },
      activeDataLabelStyle: {
         color: '#F0F0F3'
      }
   },

   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         theme: {
            fill: '#505053'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: '#505053',
         stroke: '#000000',
         style: {
            color: '#CCC'
         },
         states: {
            hover: {
               fill: '#707073',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: '#000003',
               stroke: '#000000',
               style: {
                  color: 'white'
               }
            }
         }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
         backgroundColor: '#333',
         color: 'silver'
      },
      labelStyle: {
         color: 'silver'
      }
   },

   navigator: {
      handles: {
         backgroundColor: '#666',
         borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
         color: '#7798BF',
         lineColor: '#A6C7ED'
      },
      xAxis: {
         gridLineColor: '#505053'
      }
   },

   scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
   },

   // special colors for some of the
   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
   background2: '#505053',
   dataLabelsColor: '#B0B0B3',
   textColor: '#C0C0C0',
   contrastTextColor: '#F0F0F3',
   maskColor: 'rgba(255,255,255,0.3)'
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);