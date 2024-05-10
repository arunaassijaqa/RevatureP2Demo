package com.revature.controllers;

import com.revature.daos.OrderDAO;
import com.revature.daos.UserDAO;
import com.revature.models.*;
//import com.revature.services.OrderService;

import java.util.Date;
import java.util.Optional;

import com.revature.models.dtos.OrderProductDTO;
import com.revature.services.OrderService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/orders")
public class OrderController {
    private final OrderDAO orderDAO;
    private final UserDAO userDAO;
    private OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService, UserDAO userDAO, OrderDAO orderDAO) {
        this.orderService = orderService;
        this.userDAO = userDAO;
        this.orderDAO = orderDAO;
    }

    @GetMapping
    public ResponseEntity<?> getAllOrders() {
        return ResponseEntity.ok().body("");
    }

    // @DeleteMapping("/{orderId}")
    // public ResponseEntity<Object> deleteOrder (@PathVariable int orderId) {
    //     Optional<Order> b = orderDAO.findById(orderId);
    //     if (b.isEmpty()) {
    //         return ResponseEntity.status(404).body("No order at ID " + orderId + "found");
    //     }

    //     Order order = b.get();

    //     orderDAO.deleteById(orderId);
    //     return ResponseEntity.ok().body(order.getOrderId() + " deleted from Orders");
    // } maybe?

    @PatchMapping("/{orderId}")
    public ResponseEntity<Object> completeOrder(@RequestBody Order order, @PathVariable int orderId) {
        Optional<Order> b = orderDAO.findById(orderId);
        if (b.isEmpty()) {
            return ResponseEntity.badRequest().body("Order does not exist.");
        }
        Order r = b.get();
        r.setStatus(order.getStatus());
        r.setDate(order.getDate());
        orderDAO.save(r);
        return ResponseEntity.ok().body(r);
    }

    /*  ================================
        Check if valid inputs for [OrderProduct]
            - user
            - order
            - product
            - quantity
            Check if user has Orders list,
                If not, reate Orders
                Add current item to newly created Orders and RETURN

            If user has existing Orders list, check if current item is in orders list
            If already exists, update quantity (old + new) then RETURN
            If it does not exist, add to list and RETURN

        Takes in a @RequestBody containing a OrderProduct?
            - [OrderProductId] int, auto inc
            - [Order] -> Null for now
            - [Product] -> Entire product object
            - [Quantity] -> int
     */

    // TODO: Endpoint subject to change
    @PostMapping
    public ResponseEntity<Object> addToOrder(@RequestBody OrderProductDTO orderProductDTO, HttpSession session) {
        /*
        // Check if logged in
        if (session.getAttribute("userId") == null) {
            return ResponseEntity.status(401).body("You must be logged in to do this");
        }*/

        // Try to catch errors
        try {
            //Order o = orderService.addToOrder(orderProduct, (int)session.getAttribute("userId"));
            Order o = orderService.addToOrder(orderProductDTO, 5);
            return ResponseEntity.ok(o);
        } catch (Exception e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }

    }
}
