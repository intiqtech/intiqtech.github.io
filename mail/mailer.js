$(function () {
  var form = document.getElementById("contactForm");

  async function handleSubmit(event) {
    event.preventDefault();
    var status = document.getElementById("my-form-status");
    var data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          $("#success").html("<div class='alert alert-success'>");
          $("#success > .alert-success")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
          $("#success > .alert-success").append(
            "<strong>Thanks for your submission! </strong>"
          );
          $("#success > .alert-success").append("</div>");

          //   status.innerHTML = "Thanks for your submission!";
          toastr.success("Your form has been successfully sent", "Successful");
          form.reset();
        } else {
          response.json().then((data) => {
            if (Object.hasOwn(data, "errors")) {
              toastr.error("Form wasn't sent. Please try again.", "Error");
              $("#success").html("<div class='alert alert-danger'>");
              $("#success > .alert-danger")
                .html(
                  "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
                )
                .append("</button>");
              $("#success > .alert-danger").append(
                $("<strong>").text(
                  "Oops!! " +
                    data["errors"].map((error) => error["message"]).join(", ") +
                    ", Please try again!"
                )
              );
              $("#success > .alert-danger").append("</div>");
              // status.innerHTML = data["errors"]
              //   .map((error) => error["message"])
              //   .join(", ");
            } else {
              status.innerHTML =
                "Oops! There was a problem submitting your form";
            }
          });
        }
      })
      .catch((error) => {
        status.innerHTML = "Oops! There was a problem submitting your form";
      });
  }
  form.addEventListener("submit", handleSubmit);
});
