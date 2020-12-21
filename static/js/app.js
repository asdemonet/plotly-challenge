d3.json("samples.json").then(data => {
    console.log(data);

    data.names.forEach(id => {
        d3.select("#selDataset").append("option").text(id);
    }) 
});

// d3.select("#selDataset").on("change", updateData);

var input = d3.select("#selDataset").property("value");

function optionChanged(input) {
    d3.json("samples.json").then(data => {
        // console.log(data);
        var metadata = data.metadata.filter(d => d.id == input)[0]
        // console.log(metadata)
        Object.entries(metadata).forEach(([key, value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`)
        });
        var labelData = data.samples.filter(d => d.id == input)[0]
        // console.log(labelData)
        var sampleValues = labelData.sample_values.slice(0, 10)
        var otuids = labelData.otu_ids.slice(0, 10).map(id => `OTU ${id}`)
        var otuLabels = labelData.otu_labels.slice(0, 10)
        console.log(otuLabels)
        var trace1 = [{
            x: sampleValues,
            y: otuids,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        }]

        var layout = {
            title: "Top 10 OTUs Present"
        }

        var trace2 = {
            x: otuids,
            y: sampleValues,
            text: otuLabels,
            marker: {
                size: sampleValues,
                colors: otuids
            }
        }

        var layout2 = {
            title: "Concentrations of OTUs"
        }

        Plotly.newPlot("bar", trace1, layout)

        Plotly.newPlot("bubble", trace2, layout2)
    });
}
