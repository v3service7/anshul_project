(function($) {

    // We should take in an argument for endDrag
    $.fn.SplitterBar = function() {
        $(this).css('display', 'flex');

        let leftSide = $(this).children('.left').first();
        let rightSide = $(this).children('.right').first();

        leftSide.css('background-color', 'rgba(63, 81, 181, 0);');
        leftSide.css('width', '50%');
        leftSide.css('min-width', '25%');
        leftSide.css('max-width', '75%');

        rightSide.css('background-color', 'rgba(63, 81, 181, 0);');
        rightSide.css('flex', '1');

        // Inject splitter bar
        let splitterBar = $(document.createElement('div'));
        splitterBar.css('background-color', '#263238');
        splitterBar.css('width', '10px');
        splitterBar.css('cursor', 'col-resize');
        splitterBar.css('z-index', '111');
        
        leftSide.after(splitterBar);
        
        let isDragging = false

        splitterBar.mousedown((event) => {
            isDragging = true
            return false;
        });

        splitterBar.mouseup((event) => {
            isDragging = false
            return false;
        });

        $(this).mousemove((event) => {
            if(isDragging) {
                let leftOfLeft = leftSide.position().left;
                leftSide.width(event.pageX - leftOfLeft - splitterBar.width() / 2);
            }
        });
    }
}(jQuery));