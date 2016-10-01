$(document).ready(function() {

    var cart = Cookies.getJSON('product');
    var valid = (_.isEmpty(cart))
    if (!(valid)) {
        $('.cart-product-name').text(cart.product_name);
        $('.cart-product-price').text('Rs.' + cart.product_price);
        $('.cart-img').attr('src', cart.img)

    }
    var brands = ['Apple', 'Samsung', 'Lenovo', 'Sony', 'LG'];
    var categories = ['Mobile', 'Pendrive', 'Laptop', 'Televison', 'Camera'];
    var products = [];
    for (var i in brands) {
        products.push({ value: brands[i], url: '/brand/' + brands[i] })

    }
    for (var j in categories) {
        products.push({ value: categories[j], url: '/category/' + categories[j] })

    }

    for (var i in brands) {
        for (var j in categories) {
            products.push({ value: (categories[j] + ' in ' + brands[i]), url: '/category/' + categories[j] + '/brand/' + brands[i] })

        }
    }


    $('#autocomplete').autocomplete({
        lookup: products,
        onSelect: function(suggestion) {
            window.location.href = suggestion.url
        }
    });

});

function add_to_cart() {
    var details = $('.product-details').data();
    $('.cart-product-name').text(details.product_name);
    $('.cart-product-price').text('Rs.' + details.product_price);
    $('.cart-img').attr('src', details.img);
    $('.added-to-cart').html('Successfully added to cart!');

    Cookies.set('product', details);
}

function buynow() {
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var address = $('#address').val();
    var payment = $('#payment').val();

    console.log(name, email, phone, address, payment)
    var cart = Cookies.getJSON('product');
    var product = cart.product_name;
    var price = cart.price;

    $.ajax({
        url: '/buy_now/',
        type: 'POST',
        cache: false,
        data: { name: name, email: email, phone: phone, address: address, payment: payment, product: product, price: price },
        success: function(data) {
            Cookies.remove('product');
            window.location.href = '/order_placed'
        },
        error: function(jqXHR, textStatus, err) {
            alert('text status ' + textStatus + ', err ' + err)
        }
    });

}

function removecart() {
    Cookies.remove('product');
    window.location.href = window.location.href

}