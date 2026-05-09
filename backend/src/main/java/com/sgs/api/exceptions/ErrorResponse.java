package com.sgs.api.exceptions;

import java.time.LocalDateTime;
import java.util.Map;

public class ErrorResponse {

//  private int status;
//  private String mensagem;
//  private LocalDateTime timestamp;
//
//  public ErrorResponse(int status, String mensagem) {
//    this.status     = status;
//    this.mensagem   = mensagem;
//    this.timestamp  = LocalDateTime.now();
//  }
//
//  public int getStatus() {
//    return status;
//  }
//
//  public String getMensagem() {
//    return mensagem;
//  }
//
//  public LocalDateTime getTimestamp() {
//    return timestamp;
//  }

  private int status;

  private String mensagem;

  private Map<String, String> erros;

  public ErrorResponse(int status, String mensagem) {
    this.status = status;
    this.mensagem = mensagem;
  }

  public ErrorResponse(int status, Map<String, String> erros) {
    this.status = status;
    this.erros = erros;
  }

  public int getStatus() {
    return status;
  }

  public String getMensagem() {
    return mensagem;
  }

  public Map<String, String> getErros() {
    return erros;
  }
}
