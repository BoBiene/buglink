AJS.toInit(function() {
  var baseUrl = AJS.contextPath();

  function populateForm() {
    AJS.$.ajax({
      url: baseUrl + "/rest/buglink-admin/1.0/",
      dataType: "json",
      success: function(config) {
        AJS.$("#headerText").attr("value", config.header);
        AJS.$("#regex").attr("value", config.regex);
        AJS.$("#urlTemplate").attr("value", config.urlTemplate);
      }
    });
  }
  function updateConfig() {
    var data = {
        header: AJS.$("#headerText").attr("value"),
        regex: AJS.$("#regex").attr("value"),
        urlTemplate: AJS.$("#urlTemplate").attr("value")
    }
    AJS.$.ajax({
      url: baseUrl + "/rest/buglink-admin/1.0/",
      type: "PUT",
      contentType: "application/json",
      data: JSON.stringify(data),
      processData: false,
      success: function() {
        AJS.messages.success({
          title: "Saved!",
          fadeout: true
        })
      }
    });
  }  
  populateForm();

  AJS.$("#admin").submit(function(e) {
    e.preventDefault();
    updateConfig();
  });
});