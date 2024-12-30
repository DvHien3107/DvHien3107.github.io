function calculateDays() {
    let localStartDate = localStorage.getItem('startDate');
    const startDateInput =  document.getElementById('startDate').value || localStartDate;
    if (!startDateInput) {
        document.getElementById('result').textContent = 'Vui lòng nhập một ngày hợp lệ!';
        return;
    } else {

    }
    document.getElementById('startDate').value = startDateInput;
    localStorage.setItem('startDate', startDateInput);

    const startDate = new Date(startDateInput);
    const nextCycleDate = new Date(startDate);
    nextCycleDate.setDate(startDate.getDate() + 28);

    const today = new Date();

    while (nextCycleDate <= today) {
        nextCycleDate.setDate(nextCycleDate.getDate() + 28);
    }

    const diffTime = nextCycleDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
        const countDown =( 28 - diffDays )*10
        $('#base-timer-path-remaining').css('stroke-dashoffset', countDown);
        $('#resultCycle').html(`${diffDays} ngày`);
    }
}