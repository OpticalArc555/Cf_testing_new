package com.spring.jwt.userForm.controller;
import com.spring.jwt.userForm.Dto.ResponseAllUserFormDto;
import com.spring.jwt.userForm.Dto.userFormDto;
import com.spring.jwt.userForm.Dto.userFormDtoPost;
import com.spring.jwt.userForm.service.userFormServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/userFormController")
public class userFormController {


    @Autowired
    private userFormServiceImpl userFormService;

    @PostMapping("/add")
    public ResponseEntity<?> addForm(@RequestBody userFormDtoPost userFormDtoPost) {
        try {
            userFormDtoPost createdForm = userFormService.addForm(userFormDtoPost);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdForm);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseAllUserFormDto("Failed to add form: " + e.getMessage()));
        }
    }

    @GetMapping("/getById")
    public ResponseEntity<?> getByFormId(@RequestParam Integer userFormId) {
        try {
            userFormDto form = userFormService.getByFormId(userFormId);
            return ResponseEntity.ok(form);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ResponseAllUserFormDto("Form not found with ID: " + userFormId));
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateForm(@RequestParam Integer userFormId, @RequestBody userFormDto userFormDto) {
        try {
            userFormDto updatedForm = userFormService.updateForm(userFormId, userFormDto);
            return ResponseEntity.ok(updatedForm);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseAllUserFormDto("Failed to update form: " + e.getMessage()));
        }
    }

//    @PatchMapping("/patch/{id}")
//    public ResponseEntity<?> patchForm(@PathVariable("id") Integer userFormId, @RequestBody userFormDto userFormDto) {
//        try {
//            userFormDto patchedForm = userFormService.updateForm(userFormId, userFormDto);
//            return ResponseEntity.ok(patchedForm);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ResponseAllUserFormDto("Failed to patch form: " + e.getMessage()));
//        }
//    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteForm(@RequestParam Integer userFormId) {
        try {
            userFormService.deleteForm(userFormId);
            return ResponseEntity.ok(new ResponseAllUserFormDto("Form deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseAllUserFormDto("Failed to delete form: " + e.getMessage()));
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllForms( @RequestParam(defaultValue = "0") int page,
                                          @RequestParam(defaultValue = "10") int size) {
        try {
            List<userFormDto> forms = userFormService.getAllForms(page, size);
            ResponseAllUserFormDto response = new ResponseAllUserFormDto("Success");
            response.setList(forms);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseAllUserFormDto("Failed to retrieve all forms: " + e.getMessage()));
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getByUserId(@RequestParam Integer userId) {
        try {
            List<userFormDto> forms = userFormService.getByUserId(userId);
            ResponseAllUserFormDto response = new ResponseAllUserFormDto("Success");
            response.setList(forms);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseAllUserFormDto("Failed to retrieve forms by User ID: " + e.getMessage()));
        }
    }

    @GetMapping("/salesPerson")
    public ResponseEntity<?> getBySalesPersonId(
            @RequestParam Integer salesPersonId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            List<userFormDto> forms = userFormService.getBySalesPersonId(salesPersonId, page, size);
            ResponseAllUserFormDto response = new ResponseAllUserFormDto("Success");
            response.setList(forms);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseAllUserFormDto("Failed to retrieve forms by Sales Person ID: " + e.getMessage()));
        }
    }

    @GetMapping("/inspector")
    public ResponseEntity<?> getByInspectorId(@RequestParam Integer inspectorId,
                                              @RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "10") int size) {
        try {
            List<userFormDto> forms = userFormService.getByInspectorId(inspectorId,page,size);
            ResponseAllUserFormDto response = new ResponseAllUserFormDto("Success");
            response.setList(forms);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseAllUserFormDto("Failed to retrieve forms by Inspector ID: " + e.getMessage()));
        }
    }

    @GetMapping("/status")
    public ResponseEntity<?> getByStatus(@RequestParam String status) {
        try {
            List<userFormDto> forms = userFormService.getByStatus(status);
            ResponseAllUserFormDto response = new ResponseAllUserFormDto("Success");
            response.setList(forms);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ResponseAllUserFormDto("Failed to retrieve forms by Status: " + e.getMessage()));
        }
    }
}
