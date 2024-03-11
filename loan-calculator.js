jQuery(document).ready(function($) {


    // Helper functions for formatting currency and duration
    function formatCurrency(value) {
        return parseInt(value).toLocaleString("en-NG") + ' Naira';
    }

    function formatDuration(value) {
        return value + (value === "1" ? " month" : " months");
    }

    function updateLoan() {
        var loanAmount = parseInt($('#loanAmount').val());
        var loanDuration = parseInt($('#loanDuration').val());
        var monthlyInterestRate = parseFloat(loanCalculatorVars.interestRate);
        var totalInterest = loanAmount * monthlyInterestRate * loanDuration;
        var totalPayment = loanAmount + totalInterest;

        // Update displayed loan amount and duration
        $('#loanAmountDisplay').text(formatCurrency(loanAmount));
        $('#loanDurationDisplay').text(formatDuration(loanDuration));

        // Update displayed total payment
        $('#totalPayment').text(formatCurrency(totalPayment));

        // Update visual representation of total payment
        var principalPercentage = (loanAmount / totalPayment) * 100;
        var interestPercentage = (totalInterest / totalPayment) * 100;
        $('#totalPaymentVisual').html(
            '<div class="paymentSegment principal" style="width:' + principalPercentage + '%;"></div>' +
            '<div class="paymentSegment interest" style="width:' + interestPercentage + '%;"></div>'
        );
    }

    // Add event listeners to sliders and preset buttons
    $('#loanAmount').on('input', updateLoan);
    $('#loanDuration').on('input', updateLoan);

    $('#loanAmountButtons').on('click', 'button', function() {
        $('#loanAmount').val($(this).data('amount')).trigger('input');
    });

    $('#loanDurationButtons').on('click', 'button', function() {
        $('#loanDuration').val($(this).data('duration')).trigger('input');
    });

    // Initial calculation
    updateLoan();

    // Event handler for the Apply Now button
    $('#applyNow').on('click', function() {
        var loanAmount = $('#loanAmount').val();
        var loanDuration = $('#loanDuration').val();
        var contactFormUrl = '/initial-loan-request'; // Update this URL as needed

        // Append query parameters to the URL
        contactFormUrl += '?loanAmount=' + encodeURIComponent(loanAmount) + '&loanDuration=' + encodeURIComponent(loanDuration);

        // Redirect to the contact form page
        window.location.href = contactFormUrl;
    });
});