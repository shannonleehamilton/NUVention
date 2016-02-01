(function() {
  $(function() {
    var exitSave, getNewValues, i, j, o;
    for (i = j = 1; j < 5; i = ++j) {
    }
    $('.options').sortable({
      axis: 'y',
      cancel: '.precode, .title, .locked, .updating, .toggle-edit',
      items: '.option:not(.locked)',
      start: function() {
        return $('.locked', this).each(function() {
          var self;
          self = $(this);
          return self.data('pos', self.index());
        });
      },
      change: function() {
        var $helper, $locked, $sortable;
        $sortable = $(this);
        $locked = $('.locked', this).detach();
        $helper = $('<li></li>').prependTo(this);
        $locked.each(function() {
          var self, target;
          self = $(this);
          target = self.data('pos');
          return self.insertAfter($('li', $sortable).eq(target));
        });
        return $helper.remove();
      }
    });
    o = $('.option').first();
    o.attr('data-intro', "Sort items with drag 'n drop").attr('data-position', 'left');
    o.next().find('.status-toggle').attr('data-intro', 'Toggle status').attr('data-position', 'right');
    o.next().next().find('.entypo-pencil').attr('data-intro', "Click to edit").attr('data-position', 'right');
    o.next().next().next().addClass('locked').find('.toggle-anchor').attr('data-intro', 'Anchor items in place (when conditions can be randomized)').attr('data-position', 'bottom');
    $('a[data-toggle=chardinjs]').on('click', function(e) {
      if (!$('.chardinjs-overlay').length) {
        o.next().next().next().toggleClass('editing').find('.entypo-check').attr('data-intro', 'Save changes').attr('data-position', 'right');
        $(this).text('Ok, got it.');
      } else {
        o.next().next().next().toggleClass('editing');
        $(this).text('Help');
      }
      $(this).toggleClass('blue');
      return $('body').chardinJs('toggle');
    });
    $('.toggle-edit').on('click', function() {
      var option, self;
      option = $(this).closest('.option');
      self = $(this);
      if (option.hasClass('editing')) {
        return getNewValues(option);
      } else {
        return option.toggleClass('editing');
      }
    });
    getNewValues = function(option) {
      option.find('input').each(function() {
        var v;
        v = $.trim(this.value);
        if (v.length) {
          return $(this).siblings('.display').text(v);
        } else {
          return this.value = $(this).siblings('.display').text();
        }
      });
      option.find('select').each(function() {
        var v;
        v = this.options[this.selectedIndex].label;
        return $(this).siblings('.display').text(v);
      });
      return exitSave(option);
    };
    exitSave = function(option) {
      var saveBtn;
      saveBtn = option.find('.entypo-check');
      saveBtn.text('Saved').addClass('animated bounceOut');
      return setTimeout(function() {
        option.toggleClass('editing');
        return saveBtn.removeClass('animated bounceOut').text('Save');
      }, 1000);
    };
    $(".add-new").on('click', function() {
      var n;
      n = o.clone(true);
      n.find('.display').text('');
      n.find('input.edit').val('');
      n.addClass('editing animated fadeIn');
      n.appendTo('.options').find('input').first().focus();
      return setTimeout(function() {
        return n.removeClass('animated fadeIn');
      }, 1000);
    });
    return $(".toggle-anchor").on('click', function() {
      var option, self;
      option = $(this).closest('.option');
      self = $(this);
      self.addClass('animated bounceOut');
      option.toggleClass('locked');
      return setTimeout(function() {
        return self.removeClass('animated bounceOut');
      }, 500);
    });
  });

}).call(this);