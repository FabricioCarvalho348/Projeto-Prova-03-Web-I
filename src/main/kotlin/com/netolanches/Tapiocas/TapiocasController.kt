package com.netolanches.Tapiocas

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime

@RestController
class TapiocasController(
    val foodsRepository: FoodsRepository,
    val filingsRepository: FilingsRepository,
    val salesRepository: SalesRepository
) {

    @GetMapping("/foods")
    fun getAllFoods(): List<Foods> {
        return foodsRepository.findAll()
    }

    @GetMapping("/food")
    fun getFilingsByFoodId(@RequestParam("id") id: Int = 0): Map<String, Any> {
        try {
            val food = foodsRepository.findById(id)
            val filings = filingsRepository.getAllFilingsByFoodId(id)

            val response = mapOf(
                "price" to food.get().price,
                "filings" to filings
            )

            return response
        } catch (e: Exception) {
            return mapOf("error" to e.message.toString())
        }
    }

    @GetMapping("/history")
    fun getAllSalesByCpfClient(@RequestParam("cpf") cpf: String): List<Sales> {
        return salesRepository.getAllSalesByCpfClient(cpf)
    }

    @PostMapping("/payment")
    fun processPayment(
        @RequestParam("idfood") idfood: Int,
        @RequestParam("cpf") cpf: String,
        @RequestParam("description") description: String,
        @RequestParam("price") price: Float
    ): String {

        val sale = Sales(
            id = 0,
            idfood = idfood,
            cpf = cpf,
            datesale = LocalDateTime.now(),
            description = description,
            price = price
        )

        salesRepository.save(sale)
        return "Pagamento feito com sucesso para o CPF: $cpf"
    }

}

