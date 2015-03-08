AJS.toInit(function() {
  var baseUrl = AJS.$("meta[name='application-base-url']").attr("content");
    
  function populateForm() {
    AJS.$.ajax({
      url: baseUrl + "/rest/buglink-admin/1.0/",
      dataType: "json",
      success: function(config) {
        AJS.$("#regex").attr("value", config.regex);
        AJS.$("#urlTemplate").attr("value", config.urlTemplate);
      }
    });
  }
  function updateConfig() {
    var data = {
        regex: AJS.$("#regex").attr("value"),
        urlTemplate: AJS.$("#urlTemplate").attr("value")
    }
    AJS.$.ajax({
      url: baseUrl + "/rest/buglink-admin/1.0/",
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(data),
      processData: false
    });
  }  
  populateForm();

  AJS.$("#admin").submit(function(e) {
    e.preventDefault();
    updateConfig();
  });
});